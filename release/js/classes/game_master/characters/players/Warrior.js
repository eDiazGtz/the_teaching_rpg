class Warrior extends Player {
    
    constructor() {
        super("warrior", Tools.rollDie(5) + 17, 22, 0, Tools.rollDie(2), "");

        this.agility = 22 - ( 5 - (this._maxStrength - this.strength));
    }
}