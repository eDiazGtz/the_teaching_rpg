class Troll extends Monster {
    
    constructor(name, description) {
        super(name, "troll", Tools.rollDie(5) + 20, 25, 0, Tools.rollDie(2) - 1, description);

        this.agility = 15 - ( 5 - (this._maxStrength - this.strength));
    }
    
    generateNewMonster = () => {
        return new Troll(this.name, this.description);
    }
}