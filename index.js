const puppeteer = require('puppeteer');

const username = process.env.EMAIL || 'admin';
const password = process.env.PASSWORD || 'password';
const headless = !process.argv.includes('--showBrowser');
const waitOptions = {waitUntil: ['load', 'networkidle0']};

(async () => {
  const browser = await puppeteer.launch({headless: headless, /* slowMo: 250 */ });
  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 800, deviceScaleFactor: 2});
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
  // TODO: handle unhandled Promise rejection after browser closes
})();

