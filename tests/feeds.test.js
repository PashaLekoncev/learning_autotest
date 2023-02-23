const {AuthPage, FeedPage, EditorPage, PostPage} = require("../pages");
const {PostBuilder} = require("../builders/PostBuilder");


let page, post1, post2, post3

beforeEach(async () => {
    post1 = new PostBuilder().withTitle("ПроверкаTest123456880-=+_))(&^%?`").withContent("Tetst")
        .withTags(["Разное", "Экстрим"]).build();
    post2 = new PostBuilder().withTitle("Проверка2").withContent("Tetst")
        .withTags(["Разное", "Экстрим"]).build();
    post3 = new PostBuilder().withTitle("Проверка3").withContent("Tetst")
        .withTags(["Разное", "Экстрим"]).build();

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
        await page.createPost(post1)
        page = new PostPage()
        const referencePost = await page.getPost()
        page = new EditorPage()
        await page.createPost(post2)
        await page.createPost(post3)
        page = new FeedPage()
        await page.open(FEEDS.new)
        let posts = await page.reedPosts(3)
        console.log(posts)
        expect(posts).toContainEqual(referencePost)
    });
})


