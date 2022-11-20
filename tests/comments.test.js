const {Builder} = require("selenium-webdriver");
const {AuthPage} = require("../pages/auth_page");
const {UserCommentsPage} = require("../pages/settings/user_comments_page");
const {PostPage} = require("../pages/post_page");
const {Notifications} = require("../components/notifications");



let driver, page

beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build()
    page = await new AuthPage(driver)
    await page.auth("userA", 12345)
});

afterEach(async () => {
    page = await new AuthPage(driver)
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
        page = new UserCommentsPage(driver)
        await page.open()
        let countComments = await page.getCountOfUserComment()
        page = new PostPage(driver)
        await page.open(5)
        await page.sendComment(`duckduck${Math.floor(Math.random() * 999)}`)
        await page.commentsLog(5)
        page = new UserCommentsPage(driver)
        await page.open()
        let newCountComments = await page.getCountOfUserComment()
        expect(newCountComments).toBe(countComments + 1)
    });

    test.each(arrayComments)("Проверяем правильность написания комментария '%s'", async (comment) => {
        page = await new PostPage(driver)
        await page.open(10)
        await page.sendComment(comment)
        if (comment === '') {
            let message = new Notifications(driver)
            const errorText = await message.getToastText()
            expect(errorText).toBe("Введите текст сообщения или добавьте изображение")
        } else {
            let lastComment = await page.getCommentContent(-1)
            expect(lastComment).toBe(comment)
        }
    });

})


