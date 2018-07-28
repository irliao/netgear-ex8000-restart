# netgear-ex8000-restart
Restart your Nighthawk X6S Tri-Band Range Extender directly with one command.

More than often (at least for mine), the extender is unstable and has to be restarted to temporarily fix any connectivity or speed issue.
Restarting the extender requires the user to manually login to the extender in a browser and go through multiple pages until you reach the restart button.
Instead of doing this manually (which gets old real quick), this program will restart the extender without needing to go on the browser.

## How to Install
```bash
npm i
```

## How to Configure
Create/edit a secrets.json in this project's root directory with this content:
```json 
{
  "username": "EXTENDER USERNAME",
  "password": "EXTENDER PASSWORD"
}
```
WARN: Never check in your secrets.json! (only secrets.json in the root directory of this project is protected by gitignore)

## How to Run
```bash
node index.js
```

## How to Debug
Shows the Chromium browser
```bash
node index.js --showBrowser
```

## Resources
- https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#
- https://www.w3schools.com/cssref/css_selectors.asp

## TODO
- add more logging (INFO for current progress, DEBUG for details)
- make this into single CLI command
- make program quit after restart has started
- detect and notify when network if back up (restart completed)

## License
Copyright (c) 2018 Ryan Liao. Released under the [MIT License][license].

[license]: LICENSE
[readme]: README.md
