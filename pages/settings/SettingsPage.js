const {BasePage} = require("../BasePage");
const {By} = require("selenium-webdriver");


class SettingsPage extends BasePage {

    get genderSelector() {
        return this.waitPageElementByCss("select[name=\"gender\"]")
    }

    get userInfo() {
        return this.waitPageElementByCss(".profile__user-information")
    }

    get getSelectedGender() {
        return this.waitPageElementByCss("option[selected=\"selected\"]")
    }

    async selectGender(gender) {
        return this.waitPageElement(By.xpath, `//option[contains(text(), "${gender}")]`)
    }

    async open() {
        await this.openPage("settings")
    }


    async changeGender(gender) {
        await this.clickOn(await this.genderSelector)
        await this.clickOn(await this.selectGender(gender))
    }

    async getUserGender(login) {
        await this.openPage(`@${login}`)
        let data = await this.userInfo
        data = await data.getText()
        if (data.indexOf("Пикабушница") === 0) {
            return "Женский"
        } else if (data.indexOf("Пикабушник") === 0) {
            return "Мужской"
        } else return "Не показывать"
    }

}

module.exports = {
    SettingsPage
}
