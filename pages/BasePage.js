const {Builder, By, until} = require("selenium-webdriver");
const {TextUtils} = require("../utils/TextUtils");
require('dotenv').config()

let driver = new Builder()
    .usingServer(process.env.SELENOID_URL)
    .withCapabilities({
        "browserName": "firefox",
        "version": "109.0",
        "selenoid:options": {
            "screenResolution": "1920x1024x24",
            "enableVNC": true,
            "enableVideo": true,
        }})
    .build()
driver.manage().window().maximize()


class BasePage {

    constructor(timeout = 5000) {
        global.driver = driver;
        this.timeout = timeout
    }


    async goToUrl(url) {
        await driver.get(url)
    }

    async clickOn(element) {
        try {
            await element.click()
        } catch (e) {
            await driver.executeScript("arguments[0].click();", element)
        }
    }

    async sendKeysOn(element, text) {
        await element.sendKeys(text)
    }

    async waitPageElementByCss(selector, timeout = this.timeout) {
        try {
            let element = await driver.wait(until.elementLocated(By.css(selector)),
                timeout,
                `Поиск элемента с селектором: "${selector}"`,
                1000
            );
            await driver.wait(until.elementIsVisible(element),
                timeout,
                `Ищем элемент с селектором "${selector}" на странице`,
                1000
            );
            return element
        } catch (e) {
            console.log(`Элемент по селектору ${selector} не найден`)
            return 0
        }
    }

    async waitPageElement(by, selector, timeout = this.timeout) {
        try {
            let element = await driver.wait(until.elementLocated(by(selector)),
                timeout,
                `Поиск элемента с селектором: "${selector}"`,
                1000
            );
            await driver.wait(until.elementIsVisible(element),
                timeout,
                `Ищем элемент с селектором "${selector}" на странице`,
                1000
            );
            return element
        } catch (e) {
            console.log(`Элемент с селектором: "${selector}" не найден`)
            return 0
        }
    }

    async getTextOnElement(element) {
        let text
        if (element) {
            text = await element.getText()
        }
        else {
            // на случай если не поле заголовка не сможет найтись
            text = await driver.executeScript(`return document.querySelector('span.story__title-link').textContent`)
            text = JSON.stringify(text).replaceAll('"', '')
            console.log(text)
        }
        return TextUtils.clearText(text)
    }

    async openPage(slug = '') {
        if (slug[0] === "/") {
            slug = slug.slice(1)
        }
        await driver.get(process.env.HOST_NAME + slug)
    }

    async refreshPage() {
        await driver.navigate().refresh()
    }

    async closeSession() {
        await driver.quit()
    }
}

module.exports = {
    BasePage
}
