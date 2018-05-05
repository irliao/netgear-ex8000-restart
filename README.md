# netgear-ex8000-restart
Restart your Nighthawk X6S Tri-Band Range Extender from command line

## Install
```bash
npm i
```

## Run
Reads in ./secrets.json for extender login
```bash
node index.js
```

## Debug
Shows the Chromium browser
```bash
node index.js --showBrowser
```

## Secrets.json
Login stays private by keeping the file local with .gitignore
```json 
{
  "username": "EXTENDER USERNAME",
  "password": "EXTENDER PASSWORD"
}
```

## Resources
- https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#
- https://www.w3schools.com/cssref/css_selectors.asp

## License
Copyright (c) 2018 Ryan Liao. Released under the [MIT License][license].

[license]: LICENSE
[readme]: README.md
