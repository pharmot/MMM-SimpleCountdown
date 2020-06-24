# MMM-SimpleCountdown

This is a module for [MagicMirror²](https://github.com/MichMich/MagicMirror/) that displays a countdown to a preselected date or dates.

## Installation

Clone this repository into your MagicMirror modules folder:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/pharmot/MMM-SimpleCountdown.git
```

Add the module to the modules array in the `config/config.js` file:

```js
{
    module: "MMM-SimpleCountdown",
    position: "top_left", // Can be any of the available positions
    config: {
        // See below for configurable options
    }
}
```

## Configuration options

| **Option**       | **Description**                      |
|----------------- | ------------------------------------ |
| `updateInterval`<br><br>*Optional*| How often to update (in ms).<br><br>**Default:** `30*60*1000` (30 minutes) |
| `size`<br><br>*Optional*          | Change font size of countdown.  Possible values are `"large"` and `"small"` <br><br> **Default value:** `""` (medium font size) |
| `showPastDates`<br><br>*Optional | By default, past dates are hidden.  Set to `true` to show elapsed time since dates that have passed. |
| `dates`<br><br>*Required*          | An array of dates to display.  <br><br>See [Date Object](#date-object) |

#### Date Object

| **Key** | **Description** |
| ------- | --------------- |
| `title`<br><br>*Required* | The title of the date.<br><br>**Example:** `"Election Day"` |
| `date`<br><br>*Required* | The date, as a string, formatted as: YYYY-MM-DD.<br><br>**Example:** `"2020-11-03"` |
| `display`<br><br>*Optional* | The largest time unit to display.  Possible values are `"days"`, `"weeks"`, and `"months"`. <br><br>**Default value:** `"days"` | `"days"` |

### Example configuration

```js
{
    module: "MMM-SimpleCountdown",
    position: "top_left",
    size: "small",
    config: {
        dates: [
            {
                title: "Election Day",
                date: "2020-11-03",
                display: "months",
            },
            {
                title: "Christmas",
                date: "2020-12-25",
                display: "weeks",
            }
        ]
    }
}
```

## Updating

To update the module to the latest version, type the following commands:

```bash
cd ~/MagicMirror/modules/MMM-SimpleCountdown
git pull
```

If you haven't changed the module, this should work without any problems.
Type `git status` to see your changes, if there are any, you can reset them with `git reset --hard`. After that, git pull should be possible.
