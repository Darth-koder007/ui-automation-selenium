const fs = require('fs');

/**
 * @description Take screenshot of current window
 * @param {*} driver 
 * @param {*} fileName 
 */
export async function screenShot(driver, fileName) {
    const cap = await driver.getCapabilities();
    const dir = `${__dirname}/screenshots`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return await driver.takeScreenshot(true)
        .then(
            function(image, err) {
                fs.writeFile(
                    `${dir}/[${cap.getBrowserName()}]:${fileName}.png`,
                    image, 'base64',
                    function(err) {
                        return err;
                    });
            });
}
