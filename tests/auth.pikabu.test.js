const {AuthPage} = require("../pages/auth_page");
const {SettingsPage} = require("../pages/settings/settings_page");
const {Notifications} = require("../components/notifications");

let page


beforeEach(async () => {
    page = await new AuthPage()
    await page.auth("userA", 12345)
})


afterEach(async () => {
    page = await new AuthPage()
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
        page = new SettingsPage()
        await page.changeGender(gender)
        let message = new Notifications()
        await message.searchToastText("Настройки сохранены")
        await page.refreshPage()
        let result = await page.getSelectedGender
        expect(await result.getText()).toBe(gender)
    });

    test("Проверяет корректность отображения пола аккаунта - у другого пользователя", async () => {
        page = new SettingsPage()
        const gender = await page.getUserGender("userC")
        expect(gender).toBe("Мужской")
    });

    test("Проверяет корректность отображения пола не авторизованным пользователем", async () => {
        await page.logout()
        page = new SettingsPage()
        const gender = await page.getUserGender("userB")
        expect(gender).toBe("Не показывать")
    });

    test("Тест авторизации и разлогинивания", async () => {
        await page.auth("userB", 12345)
        await page.auth("userB", 12345)
        console.log(await page.getUserNameLabel());
    });
})


