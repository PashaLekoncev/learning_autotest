const {AuthPage, FeedPage, EditorPage, PostPage} = require("../pages");


let page

beforeEach(async () => {
    page = await new AuthPage()
    await page.auth("userB", 12345)
})


afterEach(async () => {
    page = await new AuthPage()
    await page.logout()
});

afterAll(async () => {
    await page.closeSession();
})


describe("Проверка авторизации и пола пользователя", () => {
    test('Проверка что в ленте появился пост после публикации', async () => {
        page = new EditorPage()
        await page.createPost("DuckDuck", "DuckDuck", ["Разное", "Экстрим"])
        page = new PostPage
        const referencePost = await page.getPost()
        page = new FeedPage()
        await page.open(FEEDS.new)
        let posts = await page.reedPosts(8)
        expect(posts).toContainEqual(referencePost)

        console.log(posts, '----------------------------------------------------------\n', referencePost)
    });

})


