class Barbarian extends Player {
    
    constructor() {
        super("barbarian", Tools.rollDie(5) + 19, 24, 0, Tools.rollDie(1), "Kills everyone!");

        this.agility = 20 - ( 5 - (this._maxStrength - this.strength));
    }
}