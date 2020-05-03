const debug = process.argv.includes('--debug');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = debug ? 'debug' : 'info';

const fs = require('fs');
const secretsPath = './secrets.json';
if (!fs.existsSync(secretsPath)) {
  logger.error('secrets.json not found, exiting');
  return;
}

const secrets = require(secretsPath);
const username = secrets.username;
const password = secrets.password;
if (!username || !password) {
  logger.error('Error: username and/or password not found in secrets.json, exiting');
  return;
}

const puppeteer = require('puppeteer');
const waitOptions = {waitUntil: ['load', 'networkidle0']};
(async () => {
  logger.info('Starting application to restart extender');
  const browser = await puppeteer.launch({
    headless: !debug,
    slowMo: debug ? 250 : 0
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 800, deviceScaleFactor: 2}); // viewport size set to prevent mobile version
  await page.goto('http://mywifiext.local', waitOptions);

  await page.type('#userId', username)
  await page.type('#password', password)
  await Promise.all([
    page.waitForNavigation(waitOptions),
    page.click('#loginBt'), // triggers nagivation
  ]);
  logger.debug('Logged in to extender web console');

  await page.click('#settingsSpan'); // not in a promise because click does not trigger navigation
  await Promise.all([
    page.waitForNavigation(waitOptions),
    page.click('#otherSettings'), // triggers nagivation
  ]);
  logger.debug('Navigated to other settings page');

  await page.click('#restartBt'); // not in a promise because click does not trigger naviation
  await page.click('#restartYesBt'); // triggers navigation
  logger.debug('Confirmed yes to restart extender');

  await page.close();
  await browser.close();
  logger.debug('Closed puppeteer browser');
})().catch( e => {
  logger.error('Unexpected exception occurred (run with --debug for more detail): ' + e);
  process.exit(1);
}).finally(() => {
  logger.info('Successfully started power cycle to restart the extender');
  process.exit(0);
});

