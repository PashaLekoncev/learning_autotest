const {AuthPage, FeedPage, EditorPage, PostPage} = require("../pages");


let page

beforeEach(async () => {
    page = await new AuthPage()
    await page.auth("admin", process.env.PASSWORD)
})


afterEach(async () => {
    page = await new AuthPage()
    await page.logout()
});

afterAll(async () => {
    await page.closeSession();
})


describe("Проверка авторизации и пола пользователя", () => {
    test('Проверка что в ленте появился пост после нескольких публикаций', async () => {
        page = new EditorPage()
        await page.createPost("DuckDuck", "DuckDuck", ["Разное", "Экстрим"])
        const referencePost = await new PostPage().getPost()
        console.log(referencePost)
        page = new EditorPage()
        await page.createPost("DuckDuck2", "DuckDuck2", ["Разное", "Экстрим"])
        await page.createPost("DuckDuck3", "DuckDuck3", ["Разное", "Экстрим"])
        await page.createPost("DuckDuck4", "DuckDuck4", ["Разное", "Экстрим"])
        page = new FeedPage()
        await page.open(FEEDS.new)
        let posts = await page.reedPosts(4)
        expect(posts).toContainEqual(referencePost)
    });

})


