const {BasePage} = require("./BasePage");
const {PostPage} = require("./PostPage");
const {By} = require("selenium-webdriver");


class EditorPage extends BasePage {

    get titleInput() {
        return this.waitPageElementByCss(".input_title .input__input.medium-editor-element")
    }

    get bodyInput() {
        return this.waitPageElementByCss(".story-editor-block__content .input__input.medium-editor-element")
    }

    get tagsInput() {
        return this.waitPageElementByCss(".input__box .input__input.input__input_carriage")
    }

    get tagLabel() {
        return this.waitPageElementByCss(".dropdown-item__label")
    }

    get communitiesInput() {
        return this.waitPageElementByCss(".story-editor__communities .input__input")
    }

    get communitiesLabel() {
        return this.waitPageElementByCss(".dropdown-item_current")
    }

    get submitPostBtn() {
        return this.waitPageElementByCss("button[data-role=\"publish\"]")
    }

    async writeTitle(text) {
        await this.sendKeysOn(await this.titleInput, text)
    }

    async writeContent(text) {
        await this.sendKeysOn(await this.bodyInput, text)
    }

    async waitSearchingDuplicatesOnPost() {
        let ans = await this.waitPageElement(By.xpath, "//section[@data-role=\"similar-stories-message\" and contains(text(), \"Похожих постов не найдено\")]", 10000)
        return !!ans
    }


    async writeTag(tags) {
        if (Array.isArray(tags)) {
            for (let tag of tags) {
                await this.sendKeysOn(await this.tagsInput, tag)
                await this.clickOn(await this.tagLabel)
            }
        }
    }

    async writeCommunity(community) {
        if (community) {
            await this.sendKeysOn(await this.communitiesInput, community)
            await this.clickOn(await this.communitiesLabel)
        }
    }

    async createPost(post) {
        await this.open()
        await this.writeTitle(post.title)
        await this.writeContent(post.content)
        await this.writeTag(post.tags)
        if (post.communityName) await this.writeCommunity(post.communityName)
        await this.waitSearchingDuplicatesOnPost()
        await this.clickOn(await this.submitPostBtn)
        const page = new PostPage()
        await page.searchPostTitle(post.title)
        await driver.sleep(10000)
    }

    async open() {
        await this.openPage("/add")
    }

}

module.exports = {
    EditorPage
}
