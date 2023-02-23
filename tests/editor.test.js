const {AuthPage, EditorPage, FeedPage} = require("../pages");
const {PostBuilder} = require("../builders/PostBuilder");


let page, post

beforeAll(async () => {
    post = new PostBuilder()
        .withTitle("ПроверкаTest123456880-=+_))(&^%?`")
        .withContent("Tetst")
        .withTags(["Разное", "Экстрим"])
        .withCommunityName("Сообщество нумизматов").build();

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


describe("Проверка редактора", () => {
    test('Проверка создания поста', async () => {
        page = await new EditorPage().createPost(post)
        let feedPage = new FeedPage()
        await feedPage.open(FEEDS.new)
        post = await feedPage.getPost()
        let ans = await feedPage.searchPostTitle(post.title)
        expect(ans).toBe(true)
    });
})


