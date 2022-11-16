const {initDriver, waitPageElementByCss, waitPageElement, refreshPage} = require("../utils/driver");
const {expect, describe} = require("@jest/globals");
const {logout} = require("../utils/logout");
const {auth, getUserName} = require("../utils/login");
const {changeGender, getUserGender} = require("../utils/settings");
const {By} = require("selenium-webdriver");



beforeAll(async () => {
    driverWithTimeout = await initDriver(5000)
    await auth("userA", 12345, driver)
});


afterAll(async() => {
    await logout()
    await driver.quit();
});


describe("Проверка авторизации и пола пользователя",  () => {

    test('Авторизация с корректными данными - пикабу', async () => {
        const exitBtn = await waitPageElementByCss(".user__exit", ...driverWithTimeout)
        expect(await exitBtn.isDisplayed()).toBe(true)
    });

    test('Проверяет корректность отображения пола аккаунта - у самого пользователя', async () => {
        await auth("userB", 12345, driver)
        const settings = await waitPageElementByCss("a[aria-label=\"Настройки\"]", ...driverWithTimeout)
        await settings.click()
        const gender = "Мужской"
        await changeGender(gender)
        await refreshPage()

        let selectedGender = await waitPageElement(By.css, "option[selected=\"selected\"]", ...driverWithTimeout)
        const result = await selectedGender.getText()
        expect(result).toBe(gender)
    });

    test("Проверяет корректность отображения пола аккаунта - у другого пользователя", async () => {
        const gender = await getUserGender("userC")
        expect(gender).toBe("Женский")
    });

    test("Проверяет корректность отображения пола не авторизованным пользователем", async () => {
        await logout()
        const gender = await getUserGender("userA")
        expect(gender).toBe("Не показывать")
    });

    test("Тест авторизации и разлогинивания", async () => {
        await auth("userB", 12345, driver)
        await auth("userB", 12345, driver)
        console.log(await getUserName());
    });
})


