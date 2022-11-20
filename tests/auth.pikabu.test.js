const {Builder} = require("selenium-webdriver");
const {AuthPage} = require("../pages/auth_page");
const {SettingsPage} = require("../pages/settings/settings_page");
const {Notifications} = require("../components/notifications");

let driver, page

beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
});

beforeEach(async () => {
    page = await new AuthPage(driver)
    await page.auth("userA", 12345)
})


afterEach(async () => {
    page = await new AuthPage(driver)
    await page.logout()
});

afterAll(async () => {
    await page.closeSession();
})


describe("Проверка авторизации и пола пользователя",  () => {
    const genders = [
        ["Не показывать"],["Женский"],["Мужской"]
    ]


    test('Авторизация с корректными данными - Пикабу', async () => {
        const exitBtn = await page.exitBtn
        expect(await exitBtn.isDisplayed()).toBe(true)
    });

    test.each(genders)('Проверяет изменение пола аккаунта на "%s" - у самого пользователя', async (gender) => {
        await page.clickOn(await page.settingIcon)
        page = new SettingsPage(driver)
        await page.changeGender(gender)
        let message = new Notifications(driver)
        await message.searchToastText("Настройки сохранены")
        await page.refreshPage()
        let result = await page.getSelectedGender
        expect(await result.getText()).toBe(gender)
    });

    test("Проверяет корректность отображения пола аккаунта - у другого пользователя", async () => {
        page = new SettingsPage(driver)
        const gender = await page.getUserGender("userC")
        expect(gender).toBe("Мужской")
    });

    test("Проверяет корректность отображения пола не авторизованным пользователем", async () => {
        await page.logout()
        page = new SettingsPage(driver)
        const gender = await page.getUserGender("userB")
        expect(gender).toBe("Не показывать")
    });

    test("Тест авторизации и разлогинивания", async () => {
        await page.auth("userB", 12345, driver)
        await page.auth("userB", 12345, driver)
        console.log(await page.getUserNameLabel());
    });
})


