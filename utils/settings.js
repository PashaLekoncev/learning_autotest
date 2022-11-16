const {waitPageElementByCss, getPage} = require("./driver");
const {By} = require("selenium-webdriver");


async function changeGender(gender) {
    const genderSelector = await waitPageElementByCss("select[name=\"gender\"]", ...driverWithTimeout)
    await genderSelector.click()
    const selectGender = await driver.findElement(By.xpath(`//option[contains(text(), "${gender}")]`))
    await selectGender.click()
}

async function getUserGender(login) {
    await getPage(`@${login}`)
    let data = await waitPageElementByCss(".profile__user-information",...driverWithTimeout)
    data = await data.getText()
    if (data.indexOf("Пикабушница") === 0) {
        return "Женский"
    } else if (data.indexOf("Пикабушник") === 0) {
        return "Мужской"
    } else return "Не показывать"
}


module.exports = {
    changeGender, getUserGender
}
