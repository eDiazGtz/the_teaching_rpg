class Water extends Barrier {

    constructor(denyMessageSlug, passMessageSlug = null, imageName = null) {
        super("water", denyMessageSlug, passMessageSlug, imageName)
    }

    canPlayerPass = (gameMaster) => {
        return {
            canPass: false,
            response: this._denyMessageSlug
        }
    }

    clone (){
        return new Water(this._denyMessageSlug, this._passMessageSlug, this.imageName);
    } 
}