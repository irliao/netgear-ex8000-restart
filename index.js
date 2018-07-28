const fs = require('fs');
const secretsPath = './secrets.json';
if (!fs.existsSync(secretsPath)) {
  console.log("Error: secrets.json not found, exiting");
  return;
}

const secrets = require(secretsPath);
const username = secrets.username;
const password = secrets.password;
if (!username || !password) {
  console.log("Error: username and/or password not found in secrets.json, exiting");
  return;
}

const puppeteer = require('puppeteer');
const headless = !process.argv.includes('--showBrowser');
const waitOptions = {waitUntil: ['load', 'networkidle0']};
(async () => {
  const browser = await puppeteer.launch({headless: headless, /* slowMo: 250 */ });
  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 800, deviceScaleFactor: 2}); // viewport size set to prevent mobile version
  await page.goto('http://mywifiext.local', waitOptions);
  await page.type('#userId', username)
  await page.type('#password', password)
  await Promise.all([
    page.waitForNavigation(waitOptions),
    page.click('#loginBt'), // triggers nagivation
  ]);
  await page.click('#settingsSpan');
  await Promise.all([
    page.waitForNavigation(waitOptions),
    page.click('#otherSettings'), // triggers nagivation
  ]);
  await page.click('#restartBt');
  await Promise.all([
    page.waitForNavigation(waitOptions),
    page.click('#restartYesBt'), // triggers navigation
  ]);
  await browser.close();
})();

