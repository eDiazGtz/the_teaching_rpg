class CastleWall extends Barrier {

    constructor() {
        super("castle wall")
    }

    clone (){
        return new CastleWall();
    } 
}