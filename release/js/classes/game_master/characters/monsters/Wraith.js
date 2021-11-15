class Wraith extends Monster {
    
    constructor(name, description) {
        super(name, "wraith", Tools.rollDie(5) + 10, 15, 0, Tools.rollDie(3) + 1, description);

        this.agility = 25 - ( 5 - (this._maxStrength - this.strength));
    }

    generateNewMonster = () => {
        return new Wraith(this.name, this.description);
    }
}