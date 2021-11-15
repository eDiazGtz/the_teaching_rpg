class Lesson {

    description;
    exercisesLink;
    item;
    slug
    title;
    videoLink;

    constructor(slug, title, item, description, exercisesLink, videoLink = null) {

        this.item = item;
        this.title = title;
        this.description = description;
        this.slug = slug;
        this.exercisesLink = exercisesLink;
        this.videoLink =videoLink;
    }
}