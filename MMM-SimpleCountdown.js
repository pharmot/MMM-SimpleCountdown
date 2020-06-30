/* jshint esversion: 6 */
/* Magic Mirror
* Module: MMM-SimpleCountdown
* Version: 1.0.0
*
* By Andy Briggs https://github.com/pharmot
* MIT Licensed
*/

Module.register("MMM-SimpleCountdown", {
    // Module config defaults.
    defaults: {
        updateInterval: 30*60*1000,
        size: "medium",
        showPastDates: false,
        dates: [
            {
                title: "Election Day",
                date: "2020-11-03"
            },
            {
                title: "Christmas",
                date: "2020-12-25",
                display: "months",
            }
        ]
    },

    // Define required scripts.
    getScripts: function() {
        return ["moment.js"];
    },

    // Define styles.
    getStyles: function() {
        return ["MMM-SimpleCountdown.css"];
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        var self = this;

        setInterval(function() {
            self.updateDom();
        }, self.config.updateInterval);
    },

    getDom: function() {

        // create element wrapper
        var wrapper = document.createElement("div");

        let theSize = this.config.size;
        if( ! ( this.config.size === "small" || this.config.size === "large" ) ) {
            theSize = "medium";
        }

        wrapper.className = `scd_wrapper scd_wrapper--${theSize}`;

        var today = moment().hour(0).minute(0).second(0);

        this.config.dates.forEach(d => {
            // Create wrappers
            var dateWrapper = document.createElement("div");
            var titleWrapper = document.createElement("div");
            var periodWrapper = document.createElement("div");

            // Style Wrappers
            dateWrapper.className = "scd_date";
            titleWrapper.className = "scd_date__title";
            periodWrapper.className = "scd_date__period";

            titleWrapper.innerHTML = d.title;

            let starting = today.clone();

            let target = moment(d.date + "00:00:00", "YYYY-MM-DD HH:mm:ss");

            //add 1 day so difference will round up to nearest whole day
            target.add(1, 'days');

            let direction = 1;

            if (target.diff(starting) < 0) {
                direction = -1;
            }

            let periodText = "";

            if ( d.display === 'months' ) {
                let months = target.diff(starting, 'months') * direction;
                if( months > 0 ) {
                    periodText += months;
                    periodText += months > 0 ? " months" : " month";
                    starting.add(months * direction, "M");
                }
            }
            if ( d.display === 'months' || d.display === 'weeks' ) {
                let weeks = target.diff(starting, 'weeks') * direction;
                if ( weeks > 0 ) {
                    if ( periodText !== "" ) {
                        periodText += ", ";
                    }
                    periodText += weeks;
                    periodText += weeks > 1 ? " weeks" : " week";
                    starting.add(weeks * direction, "w");

                }
            }
            let days = target.diff(starting, 'days') * direction;
            if ( days > 0 ) {
                if ( periodText !== "" ) {
                    periodText += ", ";
                }
                periodText += days;
                periodText += days > 1 ? " days" : " day";
            }
            if(direction < 0 ) {
                periodText += " ago";
                dateWrapper.className += " scd_date--passed";
            }
            periodWrapper.innerHTML = periodText;

            if ( direction >= 0 || this.config.showPastDates ) {
                dateWrapper.appendChild(titleWrapper);
                dateWrapper.appendChild(periodWrapper);
                wrapper.appendChild(dateWrapper);
            }

        });
        return wrapper;
    }

});
