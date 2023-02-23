class Post {

    static async createByComponent(component) {
        let post = new Post();
        post.id = await component.getIdPost();
        post.link = await component.getLinkOfPost();
        post.title = await component.getTitle();
        post.authorId = await component.getAuthorId();
        post.authorName = await component.getAuthorName();
        post.authorLink = await component.getLinkOfAuthor();
        post.content = await component.getContent();
        post.tags = await component.getTags();
        post.communityName = await component.getCommunityName();
        // для сравнения постов не подходит
        // post.createdAt = await component.getCreateAt();

        return post;
    }
}

module.exports = {
    Post,
}
