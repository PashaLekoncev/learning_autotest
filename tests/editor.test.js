const {AuthPage} = require("../pages/auth_page");
const {EditorPage} = require("../pages/editor_page");
const {PostPage} = require("../pages/post_page");
const {expect} = require("@jest/globals");


let page


beforeAll(async () => {
    page = await new AuthPage()
    await page.auth("userA", 12345)
});

afterEach(async () => {
    page = await new AuthPage()
});

afterAll(async () => {
    await page.logout()
    await page.closeSession();
})


describe("Проверка комментариев", () => {
    test('Проверка создания поста', async () => {
        const postTitle = "Test20"

        page = new EditorPage()
        await page.open()
        await page.writeTitle(postTitle)
        await page.writeBody("Тело поста")
        await page.writeTag(["Разное", "Экстрим"])
        await driver.sleep(6000)
        await page.addPost()
        page = new PostPage()
        await page.openPage('new')
        let ans = await page.searchPostTitle(postTitle)
        expect(ans).toBe(true)
    });
})


