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

            let target = moment(d.date + "00:00:00", "YYYY-MM-DD HH:mm:ss");

            let titleText = "";

            if ( d.title ) {
                titleText = d.title;
            } else {
                titleText = target.format("MMMM D, YYYY");
            }

            let starting = today.clone();
            let direction = 1;

            //add 1 day so difference will round up to nearest whole day
            target.add(1, 'days');

            //set direction to -1 if the target date has passed
            if (target.diff(starting) < 0) {
                direction = -1;
            }

            // continue only if not passed or showPastDates is true
            if ( direction >= 0 || this.config.showPastDates ) {

                // Create wrappers
                var dateWrapper = document.createElement("div");
                var titleWrapper = document.createElement("div");
                var periodWrapper = document.createElement("div");

                // Style Wrappers
                dateWrapper.className = "scd_date";
                titleWrapper.className = "scd_date__title";
                periodWrapper.className = "scd_date__period";

                // Add title to titleWrapper
                titleWrapper.innerHTML = titleText;

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

                if ( direction < 0 ) {
                    periodText += " ago";
                    dateWrapper.className += " scd_date--passed";
                }

                periodWrapper.innerHTML = periodText;

                dateWrapper.appendChild(titleWrapper);

                dateWrapper.appendChild(periodWrapper);

                wrapper.appendChild(dateWrapper);

            }

        });
        return wrapper;
    }

});
