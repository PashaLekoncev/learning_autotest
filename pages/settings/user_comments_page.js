const {BasePage} = require("../../pages/base_page");


class UserCommentsPage extends BasePage {

    get countComments() {
        return this.waitPageElementByCss("[class=h4_section]>b")
    }

    async open() {
        await this.openPage('comments')
    }

    async getCountOfUserComment() {
        let countComments = await this.countComments
        return Number(await countComments.getText())
    }
}

module.exports = {
    UserCommentsPage
}
