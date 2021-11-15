class ForestCover extends MapPlaceCover {

    constructor() {
        super("barrier_tree");
    }

    clone (){
        return new ForestCover();
    }
}