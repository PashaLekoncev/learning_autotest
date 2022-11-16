const {By} = require("selenium-webdriver");
const {waitPageElementByCss} = require("./driver");


async function getPost(postId) {
    await driver.get(`https://stand4.pikabu.dev/story/_${postId}`)
}

async function commentsLog(postId) {
    await getPost(postId)
    const comments = await driver.findElements(By.css("div.comments__container .comment"))
    let commentsInfo = {}
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i]
        let commentBody = await comment.findElement(By.css(".comment__content"))
        commentsInfo[await comment.getAttribute("id")] = await commentBody.getText()
    }
    console.log(commentsInfo)
}

async function sendComment(postId, text) {
    await getPost(postId)
    const commentInput = await waitPageElementByCss(".input__input.medium-editor-element", ...driverWithTimeout)
    await commentInput.sendKeys(text)
    const submitComment = await waitPageElementByCss("button[class=button_success]", ...driverWithTimeout)
    await submitComment.click()
    await driver.sleep(5000)
}


async function getComment(index) {
    const comments = await driver.findElements(By.css("div.comments__container .comment"))
    return comments.slice(index)
}


async function getCommentContent(index) {
    let [comment] = await getComment(index)
    let commentBody = await comment.findElement(By.css(".comment__content"))
    return await commentBody.getText()

}

async function getToastErrorText() {
    let error = await waitPageElementByCss("div[class=toast__content]", ...driverWithTimeout)
    return await error.getText()
}

module.exports = {
    commentsLog,
    getPost,
    sendComment,
    getComment,
    getCommentContent,
    getToastErrorText
}
