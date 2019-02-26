/**
 * @fileoverview An example WebDriver script.
 *
 * Before running this script, ensure that Mozilla's geckodriver is present on
 * your system PATH: <https://github.com/mozilla/geckodriver/releases>
 *
 * Usage:
 *   // Default behavior
 *   node selenium-webdriver/example/google_search.js
 *
 *   // Target Chrome locally; the chromedriver must be on your PATH
 *   SELENIUM_BROWSER=chrome node selenium-webdriver/example/google_search.js
 *
 *   // Use a local copy of the standalone Selenium server
 *   SELENIUM_SERVER_JAR=/path/to/selenium-server-standalone.jar \
 *     node selenium-webdriver/example/google_search.js
 *
 *   // Target a remote Selenium server
 *   SELENIUM_REMOTE_URL=http://www.example.com:4444/wd/hub \
 *     node selenium-webdriver/example/google_search.js
 */

import {
    By,
    Key,
    until,
} from 'selenium-webdriver';
import {
    suite
} from 'selenium-webdriver/testing';
import 'babel-polyfill';
import assert from 'assert';
import {
    screenShot
} from './utils';

suite(function(env) {
    let driver;
    describe('Test google search', function() {
        before(async function() {
            driver = await env
                .builder()
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
                ));

            const title = await driver.getTitle();

            assert.equal(
                'webdriver - Google Search',
                title);

            await screenShot(driver,
                'should-show-search-results');
        });

        after(async function() {
            await driver.quit();
        });
    });
});
