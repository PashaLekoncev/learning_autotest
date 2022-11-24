const {Builder, By, until} = require("selenium-webdriver");

let driver =  new Builder().forBrowser('chrome').build();


class BasePage {

    constructor(timeout = 5000) {
        require('dotenv').config()
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

    async waitPageElementByCss(selector) {
        try {
            let element = await driver.wait(until.elementLocated(By.css(selector)),
                this.timeout,
                `Поиск элемента с селектором: "${selector}"`,
                1000
            );
            await driver.wait(until.elementIsVisible(element),
                this.timeout,
                `Ищем элемент с селектором "${selector}" на странице`,
                1000
            );
            return element
        } catch (e) {
            console.log(`Элемент по селектору ${selector} не найден`)
            return 0
        }
    }

    async waitPageElement(by,selector) {
        try {
            let element = await driver.wait(until.elementLocated(by(selector)),
                this.timeout,
                `Поиск элемента с селектором: "${selector}"`,
                1000
            );
            await driver.wait(until.elementIsVisible(element),
                this.timeout,
                `Ищем элемент с селектором "${selector}" на странице`,
                1000
            );
            return element
        } catch (e) {
            console.log(`Элемент с селектором: "${selector}" не найден`)
            return 0
        }
    }

    async openPage(slug='') {
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

module.exports  = {
    BasePage
}
