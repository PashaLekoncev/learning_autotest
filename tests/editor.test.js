const {AuthPage} = require("../pages/auth_page");
const {EditorPage} = require("../pages/editor_page");
const {PostPage} = require("../pages/post_page");


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
        const postTitle = "TestBOMB"

        page = new EditorPage()
        await page.addPost(postTitle, "Тело поста", ["Разное", "Экстрим"])
        await page.openPage('new')
        page = new PostPage()
        let ans = await page.searchPostTitle(postTitle)
        expect(ans).toBe(true)
    });
})


