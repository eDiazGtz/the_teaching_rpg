class MapSquare {

    barrier = null;
    character = null;
    cover = null; 
    gold = 0;
    item = null;
    place = null;
    //shop = null;
    x = 0;
    y = 0;

    _landscape = null;
    get landscape() {
        return this._landscape;
    }
    set landscape(newValue) {
        this._landscape = newValue;
        if ( this.landscape !== null && Tools.rollDie(10) < 4 ) this.gold = Tools.rollDie(10);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    updateFromSample = (sampleMapSquare) => {

        this.barrier = sampleMapSquare.barrier;
        this.character = sampleMapSquare.character;
        this.cover = sampleMapSquare.cover;
        this.item = sampleMapSquare.item;
        this.place = sampleMapSquare.place;
    }

}