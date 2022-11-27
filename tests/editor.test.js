const {AuthPage, EditorPage, PostPage, FeedPage} = require("../pages");


let page

beforeAll(async () => {
    page = await new AuthPage()
    await page.auth("userC", 12345)
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
        await page.createPost(postTitle, "Тело поста", ["Разное", "Экстрим"])
        page = new FeedPage()
        await page.open(FEEDS.new)
        page = new PostPage()
        let ans = await page.searchPostTitle(postTitle)
        expect(ans).toBe(true)
    });
})


