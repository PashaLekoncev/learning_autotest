const {AuthPage} = require("../pages/auth_page");
const {UserCommentsPage} = require("../pages/settings/user_comments_page");
const {PostPage} = require("../pages/post_page");
const {Notifications} = require("../components/notifications");



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

    const arrayComments = [
        [""],
        ["~`!@#$%^&*()_+?:\"{}[];’"],
        ["-1"],
        ["<script>alert(123)</script>"],
        ["Проверка4ADAWDWWAD"],
        ["Проверка5^^%%(*(*&^"]
    ]

    test("Проверяем количество комментариев", async () => {
        page = new UserCommentsPage()
        await page.open()
        let countComments = await page.getCountOfUserComment()
        page = new PostPage()
        await page.open(5)
        await page.sendComment(`duckduck${Math.floor(Math.random() * 999)}`)
        await page.commentsLog(5)
        page = new UserCommentsPage()
        await page.open()
        let newCountComments = await page.getCountOfUserComment()
        expect(newCountComments).toBe(countComments + 1)
    });

    test.each(arrayComments)("Проверяем правильность написания комментария '%s'", async (comment) => {
        page = await new PostPage()
        await page.open(10)
        await page.sendComment(comment)
        if (comment === '') {
            let message = new Notifications()
            const errorText = await message.getToastText()
            expect(errorText).toBe("Введите текст сообщения или добавьте изображение")
        } else {
            let lastComment = await page.getCommentContent(-1)
            expect(lastComment).toBe(comment)
        }
    });

})


