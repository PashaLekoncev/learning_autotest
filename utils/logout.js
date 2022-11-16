const {waitPageElementByCss, waitPageElement} = require("./driver");
const {By} = require("selenium-webdriver");


async function logout() {
    const exitBtn = await waitPageElementByCss(".user__exit", ...driverWithTimeout)
    await exitBtn.click()
    const acceptExitBtn = await waitPageElementByCss(".button_danger", ...driverWithTimeout)
    await acceptExitBtn.click()
    await isUserUnauthorized()
}

async function isUserUnauthorized() {
    let ans = await waitPageElement(By.xpath,`//div[@class="auth__header" and contains(text(), 'Авторизация')] `,
        ...driverWithTimeout)
    return !!ans;
}


module.exports = {
    logout, isUserUnauthorized
}
