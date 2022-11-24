const {BasePage} = require("../pages/base_page");
const {By} = require("selenium-webdriver");




class AuthPage extends BasePage{

    get login() {return this.waitPageElementByCss("input[placeholder=\"Логин\"]")}
    get password() {return this.waitPageElementByCss("input[placeholder=\"Пароль\"]")}
    get authBtn() {return this.waitPageElementByCss("#signin-form button")}
    get userNameLabel() {return this.waitPageElementByCss("a.user__nick.user__nick_big")}
    get exitBtn() {return this.waitPageElementByCss(".user__exit")}
    get acceptExitBtn() {return this.waitPageElementByCss(".button_danger")}
    get unAuthorizedForm() {return this.waitPageElement(By.xpath,`//div[@class="auth__header" and contains(text(), 'Авторизация')]`)}
    get settingIcon() {return this.waitPageElementByCss("a[aria-label=\"Настройки\"]")}

    async open() {
        await this.openPage()
    }

    async isUserAuthorized() {
        let isVisible = await this.userNameLabel
        return !!isVisible;
    }

    async getUserNameLabel() {
        let ans = await this.userNameLabel
        return ans.getText()
    }

    async auth(userName, password) {
        await this.open();
        if (await this.isUserUnauthorized()) {
            await this.signIn(userName, password)
        }
        else if (await this.isUserAuthorized() && userName === await this.getUserNameLabel()) {
            return null
        } else if (await this.isUserAuthorized() && userName !== await this.getUserNameLabel()) {
            await this.logout()
            await this.signIn(userName, password)
        }
    }

    async signIn(login, password) {
        await this.sendKeysOn(await this.login, login)
        await this.sendKeysOn(await this.password, password)
        await this.clickOn(await this.authBtn)
        await this.isUserAuthorized()
    }

    async logout() {
        try {
            await this.clickOn(await this.exitBtn)
            await this.clickOn(await this.acceptExitBtn)
            await this.isUserUnauthorized()
        } catch (e) {
            console.log("Пользователь уже разлогирован!")
            return 0
        }
    }

    async isUserUnauthorized() {
        let isVisible = await this.unAuthorizedForm
        return !!isVisible;
    }

}

module.exports = {
    AuthPage
}
