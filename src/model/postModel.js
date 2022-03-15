class PostModel {
    constructor(
        id,
        date,
        title,
        author,
        tags,
        categories,
        content
    ) {
        this.id = id
        this.date = date
        this.title = title
        this.author = author
        this.tags = tags
        this.categories = categories
        this.content = content
    }
}


export default PostModel