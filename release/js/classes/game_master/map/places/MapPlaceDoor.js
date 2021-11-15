class MapPlaceDoor extends Barrier {

    point;

    constructor(name, point, denyMessageSlug = null, passMessageSlug = null, imageName = null) {
        super(name, denyMessageSlug, passMessageSlug, imageName);
        
        this.point = point;
    }
}