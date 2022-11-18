const {expect, describe, afterAll, beforeAll, test} = require("@jest/globals");
const {Builder} = require("selenium-webdriver");
const {AuthPage} = require("../pages/auth_page");

let driver, page

beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
    page = await new AuthPage(driver)
    await page.auth("userA", 12345)
});


afterAll(async() => {
    await page.logout()
    await page.closeSession();
});


describe("Проверка авторизации и пола пользователя",  () => {

    test('Авторизация с корректными данными - Пикабу', async () => {
        const exitBtn = await page.exitBtn
        expect(await exitBtn.isDisplayed()).toBe(true)
    });

    test('Проверяет корректность отображения пола аккаунта - у самого пользователя', async () => {
        await page.auth("userB", 12345)
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


