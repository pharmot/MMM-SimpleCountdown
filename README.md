# MMM-SimpleCountdown

This is a module for [MagicMirror²](https://github.com/MichMich/MagicMirror/) that displays a countdown to a specified date or dates.

![Screenshot](images/screenshot.png?raw=true "Screenshot")

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

| **Option**       | **Description**                                                                          | **Default**               |
|----------------- | ---------------------------------------------------------------------------------------- | ------------------------- |
| `updateInterval` | How often to update (in ms).                                                             | `30*60*1000` (30 minutes) |
| `size`           | Change font size of countdown.  Possible values are `"small"`, `"medium"`, and `"large"` | `"medium"`                |
| `showPastDates`  | Set to `true` to show elapsed time since dates that have passed.                         | `false`                   |
| `dates`          | An array of dates to display. See [Date Object](#date-object).                           | *N/A*                     |

#### Date Object

| **Key**   | **Description**                                                                | **Example**             |
| --------- | ------------------------------------------------------------------------------ | ----------------------- |
| `title`   | The title of the date. *(Required)*                                            | `"Election Day"`        |
| `date`    | The date, as a string, formatted as: YYYY-MM-DD. *(Required)*                  | `"2020-11-03"`          |
| `display` | The largest time unit to display. *(Optional)* <br>**Default value:** `"days"` | `"weeks"`<br>`"months"` |

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

## Display Sizes

### Default

(with `showPastDates` set to `true`)

![Medium Size](images/medium.png?raw=true "Medium Size")

### Small

![Small Size](images/small.png?raw=true "Small Size")

### Large

![Large Size](images/large.png?raw=true "Large Size")
