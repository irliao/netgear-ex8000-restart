# netgear-ex8000-restart
Restart your Nighthawk X6S Tri-Band Range Extender directly with one command.

More than often (at least for mine), the extender is unstable and has to be restarted to temporarily fix any connectivity or speed issue.
Restarting the extender requires the user to manually login to the extender in a browser and go through multiple pages until you reach the restart button.
Instead of doing this manually (which gets old real quick), this program will restart the extender without needing to go on the browser.

### Disclaimer
Please carefully review the source code before installing and running it.

**I am not responsible for any damage or data loss caused by this repository. Run at your own risk!**

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
Opens Chromium to show actions taken and outputs debug logs.
```bash
node index.js --debug
```

## Dependencies
* [puppeteer](https://github.com/puppeteer/puppeteer)
* [log4js-node](https://github.com/log4js-node/log4js-node)

## License
Copyright (c) 2020 Ryan Liao. Released under the [MIT License][license].

[license]: LICENSE
[readme]: README.md
