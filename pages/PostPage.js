const {BasePage} = require("./BasePage");
const {Post} = require("../components");
const {By} = require("selenium-webdriver");


class PostPage extends BasePage {

    get commentsOfPostArr() {
        return driver.findElements(By.css("div.comments__container .comment"))
    }

    get commentInput() {
        return this.waitPageElementByCss(".input__input.medium-editor-element")
    }

    get submitComment() {
        return this.waitPageElementByCss("button[class=button_success]")
    }

    get postElement() {
        return this.waitPageElement(By.xpath, "//div[@class=\'page-story__story\']//article[@data-recom-algo]")
    }

    async getPost() {
        let post = new Post(await this.postElement)
        post = await post.init()
        return post
    }

    async open(postId) {
        await this.openPage(`story/_${postId}`)
        // ожидание появления блока комментариев
        await this.waitPageElementByCss(".input__input.medium-editor-element")
    }

    async searchPostTitle(title) {
        let post = await this.waitPageElement(By.xpath, `//span[@class="story__title-link" and contains(text(),"${title}")]`, 10000)
        return !!post
    }

    // логирование комментариев поста
    async commentsLog() {
        const comments = await this.commentsOfPostArr
        let commentsInfo = {}
        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i]
            let commentBody = await comment.findElement(By.css(".comment__content"))
            commentsInfo[await comment.getAttribute("id")] = await commentBody.getText()
        }
        console.log(commentsInfo)
    }

    async sendComment(text) {
        await this.sendKeysOn(await this.commentInput, text)
        await this.clickOn(await this.submitComment)
        // поиск комментария, что он действительно добавился
        if (text !== "") {
            await this.searchComment(text)
        }
    }

    async getComment(index) {
        const comments = await this.commentsOfPostArr
        return comments.slice(index)
    }

    async getCommentContent(index) {
        let [comment] = await this.getComment(index)
        let commentBody = await comment.findElement(By.css(".comment__content"))
        return await commentBody.getText()
    }

    async searchComment(text) {
        return await this.waitPageElement(By.xpath, `//p[@class="rv-comment" and contains(text(),'${text}')]`)
    }
}

module.exports = {
    PostPage
}
