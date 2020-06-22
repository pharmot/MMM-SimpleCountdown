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

| **Option**    | **Description** |
|-------------- | ---------------- |
| `dates`       | *Required* An array of dates to display.  See [Date Object](#date-object) |

#### Date Object

| **Key** | **Description** | **Example** |
| ------- | --------------- | ----------- |
| `title` | *Required* The display name of the date. | `"Election Day"` |
| `date`  | *Required* The date, as YYYY-MM-DD. | `"2020-11-03"` |
| `display` | *Optional* The largest time unit to display.  Possible values are `days`, `weeks`, and `months`. <br>**Default value:** `days` | `days` |

### Example configuration

```js
{
    module: "MMM-SimpleCountdown",
    position: "top_left",
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
