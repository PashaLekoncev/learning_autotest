const {BasePage} = require("../pages/base_page");
const {By} = require("selenium-webdriver/lib/by");

class Notifications extends BasePage{

    async searchToastText(message) {
        try {
            let toast = await this.waitPageElement(By.xpath,`//div[@class="toast__content" and contains(text(), "${message}")]`)
            return await toast
        } catch (e) {
            console.log(`Уведомление "${message}" не было найдено!`)
            return 0
        }
    }

    async getToastText() {
        try {
            let toast = await this.waitPageElementByCss(`div[class="toast__content"]`)
            return await toast.getText()
        } catch (e) {
            console.log(`Уведомление не было найдено!`)
            return 0
        }
    }
}

module.exports = {
    Notifications,
}
