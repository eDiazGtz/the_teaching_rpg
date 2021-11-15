class TownBuilding extends MapPlaceDoor {

    constructor(point, name) {
        super(name, point, null, null, name);
    }

    canPlayerPass(map, player, candidateMapSquare) {}

    // override
    clone() {
        return new TownBuilding(this._name, this._denyMessageSlug, this._passMessageSlug, this.imageName);
    }
}