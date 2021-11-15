class MapPlaceCover {

    imageName;

    constructor(imageName) {
        this.imageName = imageName.split(" ").join("_").toLocaleLowerCase();
    }
}

//TODO: remove prefixes from file name to folders