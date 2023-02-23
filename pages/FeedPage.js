const {BasePage} = require("./BasePage");
const {By} = require("selenium-webdriver");
const {PostComponent} = require("../components/PostComponent");
const {Post} = require("../models/Post");

class FeedPage extends BasePage {

    constructor() {
        super();
        global.FEEDS = {
            hot: 'hot',
            best: 'best',
            new: 'new',
            subs: 'subs'
        }
    }

    async reedPosts(countPost) {
        const postsArr = []
        // Исключаем рекламный блоки
        const posts = await driver.findElements(By.xpath("//article[@data-recom-algo]"))
        if (posts.length >= countPost) {
            for (let i = 0; i < countPost; i++) {
                let post = posts[i]
                let component = new PostComponent(post)
                post = await Post.createByComponent(component)
                postsArr.push(post)
            }
            return postsArr
        } else if (countPost > posts.length) {
            throw new Error('Нельзя прочитать больше постов чем есть на странице')
        }
    }
    async searchPostTitle(title) {
        let postTitle = await this.getTextOnElement(await this.waitPageElement(By.xpath, `//h2[@class="story__title"]`))
        return postTitle === title
    }

    async open(slag = FEEDS.hot) {
        await this.openPage(slag)
    }

}

module.exports = {
    FeedPage
}
