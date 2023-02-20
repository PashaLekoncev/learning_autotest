const {AuthPage, EditorPage, PostPage, FeedPage} = require("../pages");
const {PostBuilder} = require("../builders/PostBuilder");
const {test} = require("@jest/globals");


let page

beforeAll(async () => {
    post = new PostBuilder()
        .withTitle("Проверка")
        .withContent("Тело поста")
        .withCommunityName("olo")
        .withTags(["Разное", "Экстрим"])
        .build();
    page = await new AuthPage()
    await page.auth("userC", process.env.PASSWORD)
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
        page = new EditorPage()
        await page.createPost(post)
        page = new FeedPage()
        await page.open(FEEDS.new)
        page = new PostPage()
        let ans = await page.searchPostTitle(post.title)
        expect(ans).toBe(true)
    });
})


