const {By} = require("selenium-webdriver");


class Post {
    constructor(root) {
        this.root = root
    }

    async init() {
        this.id = await this.getIdPost()
        this.link = await this.getLinkOfPost()
        this.title = await this.getTitle()
        this.authorId = await this.getAuthorId()
        this.authorName = await this.getAuthorName()
        this.authorLink = await this.getLinkOfAuthor()
        this.content = await this.getContent()
        this.tags = await this.getTags()
        this.community = await this.getCommunityName()

        return this
    }

    async getIdPost() {
        return await this.root.getAttribute("data-story-id")
    }

    async getLinkOfPost() {
        let link = await this.root.findElement(By.css(".story__copy-link.hint"))
        link = await link.getAttribute("data-url")
        return await this.percentEncodedWin1251ToDOMString(link)
    }

    async getTitle() {
        let title = await this.root.findElement(By.css(".story__title-link"))
        title = await title.getText()
        return title
    }

    async getAuthorName() {
        return await this.root.getAttribute("data-author-name")
    }

    async getAuthorId() {
        let authorId = await this.root.findElement(By.css(".story__user-link.user__nick"))
        authorId = authorId.getAttribute("data-id")
        return authorId
    }

    async getLinkOfAuthor() {
        let authorId = await this.root.findElement(By.css(".story__user-link.user__nick"))
        authorId = authorId.getAttribute("href")
        return authorId
    }

    async getCreateAt() {
        let createAt = await this.root.findElement(By.css(".caption.story__datetime.hint"))
        createAt = createAt.getText()
        return createAt
    }

    async getContent() {
        let content = await this.root.findElement(By.css(".story__content.story__typography"))
        content = content.getText()
        return content
    }

    async getTags() {
        const tagsArr = []
        let tags = await this.root.findElements(By.css(".tags__tag"))
        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i]
            tag = await tag.getText()
            tagsArr.push(tag)
        }
        return tagsArr
    }

    async getCommunityName() {
        try {
            let communityName = await this.root.findElement(By.css(".story__community-link"))
            communityName = communityName.getText()
            return communityName
        } catch (e) {
            return 'Сообщество отсутствует'
        }
    }

    async percentEncodedWin1251ToDOMString(str) {
        let decodeMap = {};
        let win1251 = new TextDecoder("windows-1251");
        for (let i = 0x00; i < 0xFF; i++) {
            let hex = (i <= 0x0F ? "0" : "") + i.toString(16).toUpperCase();
            decodeMap[hex] = win1251.decode(Uint8Array.from([i]));
        }
        return str.replace(/%([0-9A-F]{2})/g,
            (match, hex) => decodeMap[hex]);
    }

}

module.exports = {
    Post
}
