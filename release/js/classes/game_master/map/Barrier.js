class Barrier {

    eventListener = new EventHandler();
    imageName;

    _denyMessageSlug;
    _name;
    _passMessageSlug;

    constructor(name, denyMessageSlug = null, passMessageSlug = null, imageName = null) {

        this._denyMessageSlug = denyMessageSlug;
        this.imageName = imageName === null ? `barrier_${name.split(" ").join("_").toLowerCase()}` : imageName;
        this._name = name;
        this._passMessageSlug = passMessageSlug;
    }
    // override
    canPlayerPass(map, player){
        return {
            canPass: false,
            response: this._denyMessageSlug
        }
    }

    // override
    clone (){
        return new Barrier(this._name, this._denyMessageSlug, this._passMessageSlug, this.imageName);
    } 
}