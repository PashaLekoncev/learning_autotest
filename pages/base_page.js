const {until, By} = require("selenium-webdriver");


class BasePage {
    constructor(driver, timeout = 30000) {
        require('dotenv').config()
        this.driver = driver
        this.timeout = timeout
    }

    // async initDriver() {
    //     return new Builder().forBrowser("chrome").build()
    // } // TODO А можно чтобы работало так?)

    async goToUrl(url) {
        await this.driver.get(url)
    }

    async clickOn(element) {
        try {
            await element.click()
        } catch (e) {
            await this.driver.executeScript("arguments[0].click();", element)
        }
    }

    async sendKeysOn(element, text) {
        await element.sendKeys(text)
    }

    async waitPageElementByCss(selector) {
        try {
            let element = await this.driver.wait(until.elementLocated(By.css(selector)),
                this.timeout,
                `Поиск элемента с селектором: "${selector}"`,
                1000
            );
            await this.driver.wait(until.elementIsVisible(element),
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
            let element = await this.driver.wait(until.elementLocated(by(selector)),
                this.timeout,
                `Поиск элемента с селектором: "${selector}"`,
                1000
            );
            await this.driver.wait(until.elementIsVisible(element),
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
        await this.driver.get(process.env.HOST_NAME + slug)
    }

    async refreshPage() {
        await this.driver.navigate().refresh()
    }

    async closeSession() {
        await this.driver.quit()
    }
}

module.exports  = {
    BasePage
}
