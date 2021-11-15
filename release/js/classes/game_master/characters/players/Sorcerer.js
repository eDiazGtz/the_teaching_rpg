class Sorcerer extends Player {
    
    constructor() {
        super("sorcerer", Tools.rollDie(5) + 15, 20, 0, Tools.rollDie(3) + 2, "");

        this.agility = 20 - ( 5 - (this._maxStrength - this.strength));
    }
}