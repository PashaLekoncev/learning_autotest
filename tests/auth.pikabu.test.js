const {AuthPage, SettingsPage} = require("../pages");
const {Notifications} = require("../components");

let page

beforeEach(async () => {
    page = await new AuthPage()
    await page.auth("userA", process.env.PASSWORD)
})


afterEach(async () => {
    page = await new AuthPage()
    await page.logout()
});

afterAll(async () => {
    await page.closeSession();
})


describe("Проверка авторизации и пола пользователя", () => {
    const genders = [
        ["Не показывать"], ["Женский"], ["Мужской"]
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
        expect(gender).toBe("Мужской")
    });

    test("Тест авторизации и разлогинивания", async () => {
        await page.auth("userB", process.env.PASSWORD)
        await page.auth("userB", process.env.PASSWORD)
        console.log(await page.getUserNameLabel());
    });
})


