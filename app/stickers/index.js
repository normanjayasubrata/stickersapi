
class Sticker {
    constructor({title, description, rating, url} = {}) {
        this.title = title || "";
        this.description = description || "";
        this.rating = rating || 0;
        this.url = url || "";
    }

    validate() {
        const hasTitle = this.title.trim() !== "";
        const hasDescription = this.description.trim() !== "";
        const hasRating = !isNaN(this.rating) && this.rating !== 0
        const hasUrl = this.url.trim() !== "";

        return hasTitle && hasDescription && hasRating && hasUrl;
    }

   
}

module.exports = Sticker