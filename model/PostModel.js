class PostModel {
    constructor(id, link, title, authorId, authorName, authorLink, content, tags, communityName) {
            this.id = id
            this.link = link
            this.title = title
            this.authorId  = authorId
            this.authorName = authorName
            this.authorLink = authorLink
            this.content = content
            this.tags = tags
            this.communityName = communityName
    }
}

module.exports = {
    PostModel
}
