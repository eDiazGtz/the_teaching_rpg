class FloorTroll extends Enemy {

    constructor() {
        super("monster", "troll", Tools.rollDie(5) + 20, 25, 0, Tools.rollDie(2) - 1, "")
    }

    

}