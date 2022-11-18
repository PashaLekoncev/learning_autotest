// const {Builder, until, By} = require("selenium-webdriver");
// const fs = require("fs");
// const fsPromises = fs.promises;
// const path = require("path")
//
//
// async function initDriver(timeout) {
//     require('dotenv').config()
//     driver = await new Builder().forBrowser('chrome').build();
//     return [driver, timeout]
// }
//
// async function waitPageElementByCss(selector, driver,timeout=10000) {
//     try {
//         return await driver.wait(until.elementLocated(By.css(selector)), timeout);
//     } catch (e) {
//         console.log(`Элемент по селектору ${selector} не найден`)
//         return 0
//     }
// }
//
// async function waitPageElement(by,selector, driver,timeout=10000) {
//     try {
//         return await driver.wait(until.elementLocated(by(selector)), timeout);
//     } catch (e) {
//         console.log(`Элемент по селектору ${selector} не найден`)
//         return 0
//     }
// }
//
// async function screenshot() {
//     driver.takeScreenshot().then( async function (data) {
//         let base64Data = await data.replace(/^data:image\/png;base64,/,"")
//         let [fileName, dirName] = await getTestNameAndDirName()
//         await fsPromises.mkdir(path.resolve(__dirname, '..', 'data', dirName),{"recursive": true})
//         await fsPromises.writeFile(path.resolve(__dirname, '..', 'data', dirName, fileName + ".png"), base64Data, 'base64')
//         })
// }
//
// async function getTestNameAndDirName() {
//     const re = await RegExp("(?=[А-Я])")
//     let arrNamesTest = expect.getState().currentTestName.split(re)
//     let fileName = arrNamesTest.pop(-1).trim()
//     let dirName = arrNamesTest.pop().trim()
//     return [fileName.replace(/ /g, '_'), dirName.replace(/ /g, '_')]
// }
//
// async function getPage(slug='') {
//     if (slug[0] === "/") {
//         slug = slug.slice(1)
//     }
//     await driver.get(process.env.HOST_NAME + slug)
// }
//
// async function refreshPage() {
//     await driver.navigate().refresh()
// }
//
//
// module.exports = {
//     initDriver,
//     waitPageElementByCss,
//     waitPageElement,
//     screenshot,
//     getPage,
//     refreshPage,
// }
