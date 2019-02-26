/**
 * @fileoverview An example of running Chrome or Firefox in headless mode.
 *
 * To run with Chrome, ensure you have Chrome 59+ installed and that
 * chromedriver 2.30+ is present on your system PATH:
 * <https://sites.google.com/a/chromium.org/chromedriver/downloads>
 *
 *     SELENIUM_BROWSER=chrome node selenium-webdriver/example/headless.js
 *
 * To run with Firefox, ensure you have Firefox 57+ installed and that
 * geckodriver 0.19.0+ is present on your system PATH:
 * <https://github.com/mozilla/geckodriver/releases>
 *
 *     SELENIUM_BROWSER=firefox node selenium-webdriver/example/headless.js
 */

import {
    By,
    Key,
    until,
} from 'selenium-webdriver';
import {
    Options as chromeOptions
} from 'selenium-webdriver/chrome';
import {
    Options as firefoxOptions
} from 'selenium-webdriver/firefox';
import {
    suite
} from 'selenium-webdriver/testing';
import 'babel-polyfill';
import assert from 'assert';
import {
    screenShot
} from './utils';

const width = 640;
const height = 480;

suite(function(env) {
    let driver;
    describe('Test google search in headless mode', function() {
        before(async function() {
            driver = await env.builder()
                .setChromeOptions(
                    new chromeOptions()
                    .headless()
                    .windowSize({
                        width,
                        height
                    }))
                .setFirefoxOptions(
                    new firefoxOptions()
                    .headless()
                    .windowSize({
                        width,
                        height
                    }))
                .build();
        });

        it('Should show search results', async function() {

            await driver.get(
                'http://www.google.com/'
            );

            await driver
                .findElement(By.name('q'))
                .sendKeys('webdriver', Key.RETURN);

            await driver
                .wait(until.titleIs(
                    'webdriver - Google Search'
                ), 1000);

            const title = await driver.getTitle();

            assert.equal(
                'webdriver - Google Search',
                title);

            await screenShot(driver,
                'headless-should-show-search-results'
            );
        });

        after(async function() {
            await driver.quit();
        });
    });
});
