/* Magic Mirror
* Module: MMM-SimpleCountdown
*
* By Andy Briggs https://github.com/pharmot
* MIT Licensed
*/

Module.register("MMM-SimpleCountdown", {
    // Module config defaults.
    defaults: {
        updateInterval: 30*60*1000,
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
            self.updateDom()
        }, self.config.updateInterval);
    },

    getDom: function() {

        // TODO: check for presence of dates, return message if none present

        // create element wrapper
        var wrapper = document.createElement("div");
        wrapper.className = "MMM-SimpleCountdown-wrapper";

        var today = moment().hour(0).minute(0).second(0);

        self.config.dates.forEach(d => {
            // Create wrappers
            var dateWrapper = document.createElement("div");
            var titleWrapper = document.createElement("div");
            var periodWrapper = document.createElement("div");

            // Style Wrappers
            dateWrapper.className = "MMM-SimpleCountdown-date";
            titleWrapper.className = "MMM-SimpleCountdown-title normal small";
            periodWrapper.className = "MMM-SimpleCountdown-period time bright medium";

            titleWrapper.innerHTML = d.title;

            let periodText = "";

            let starting = today.clone();

            let target = moment(d.date + "00:00:00", "YYYY-MM-DD HH:mm:ss");

            let direction = 1;
            if (target.diff(starting) < 0) {
                direction = -1;
            }

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
                        periodText += ", "
                    }
                    periodText += weeks;
                    periodText += weeks > 1 ? " weeks" : " week";
                    starting.add(weeks * direction, "w");

                }
            }
            let days = target.diff(starting, 'days') * direction;
            if ( days > 0 ) {
                if ( periodText !== "" ) {
                    periodText += ", "
                }
                periodText += days;
                periodText += days > 1 ? " days" : " day";
            }
            if(direction < 0 ) {
                periodText += " ago";
                dateWrapper.className += " passed"
            }
            periodWrapper.innerHTML = periodText;

            dateWrapper.appendChild(titleWrapper);
            dateWrapper.appendChild(periodWrapper);
            wrapper.appendChild(dateWrapper);
        });
        return wrapper;
    }

});
