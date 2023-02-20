const {PostModel} = require("../model/PostModel");

class PostBuilder {
    constructor() {
        this.post = new PostModel
    }
    withId(id) {
        this.post.id = id
        return this
    }
    withLink(link) {
        this.post.link = link
        return this
    }
    withAuthorId(authorId) {
        this.post.authorId = authorId
        return this
    }
    withTitle(title) {
        this.post.title = title
        return this
    }

    withAuthorName(authorName) {
        this.post.authorName = authorName
        return this
    }

    withAuthorLink(authorLink) {
        this.post.authorLink = authorLink
        return this
    }
    withContent(content) {
        this.post.content = content
        return this
    }
    withTags(tags) {
        this.post.tags = tags
        return this
    }
    withCommunityName(communityName) {
        this.post.communityName = communityName
        return this
    }
    build() {
        return this.post
    }
}


module.exports = {
    PostBuilder
}
