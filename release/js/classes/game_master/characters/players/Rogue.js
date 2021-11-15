class Rogue extends Player {
    
    constructor() {
        super("rogue", Tools.rollDie(5) + 16, 21, 0, Tools.rollDie(2) + 1, "");

        this.agility = 20 - ( 5 - (this._maxStrength - this.strength));
    }
}