const {getPage, waitPageElementByCss} = require("../utils/driver");
const {By} = require("selenium-webdriver");
const {getPost} = require("./post");


async function getCountOfUserComment() {
    await getPage("comments")
    let CountComments = await waitPageElementByCss("[pages=h4_section]>b", ...driverWithTimeout)
    return Number(await CountComments.getText())
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
    const submitComment = await waitPageElementByCss("button[pages=button_success]", ...driverWithTimeout)
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

module.exports = {
    getCountOfUserComment,
    commentsLog,
    sendComment,
    getComment,
    getCommentContent,
}
