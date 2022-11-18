const {initDriver} = require("../utils/driver");
const {expect, describe} = require("@jest/globals");
const {logout} = require("../components/logout");
const {auth} = require("../components/login");
const {getCountOfUserComment, sendComment, commentsLog, getCommentContent} = require("../components/comment");
const {getToastErrorText} = require("../components/erorrs");


beforeAll(async () => {
    driverWithTimeout = await initDriver(5000)
    await auth("userA", 12345, driver)
});


afterAll(async() => {
    await logout()
    await driver.quit();
});


describe("Проверка авторизации и пола пользователя",  () => {

    const arrayComments = [
        [""],
        ["~`!@#$%^&*()_+?:\"{}[];’"],
        ["-1"],
        ["<script>alert(123)</script>"],
        ["Проверка4ADAWDWWAD"],
        ["Проверка5^^%%(*(*&^"]
    ]

    test("Проверяем количество комментариев", async () => {
        let countComments = await getCountOfUserComment()
        await sendComment(5, "duckduck12312")
        await commentsLog(5)
        let newCountComments = await getCountOfUserComment()
        expect(newCountComments).toBe(countComments + 1)
    });

    test.each(arrayComments)("Проверяем правильность написания комментария '%s'", async (comment) => {
        await sendComment(5, comment)
        if (comment === '') {
            const errorText = await getToastErrorText()
            expect(errorText).toBe("Введите текст сообщения или добавьте изображение")
        } else {
            let lastComment = await getCommentContent(-1)
            expect(comment).toBe(lastComment)
        }
    });

})


