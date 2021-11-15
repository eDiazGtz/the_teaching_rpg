class Deamon extends Monster {
    
    constructor(name, description) {
        super(name, "deamon", Tools.rollDie(5) + 23, 28, 0, Tools.rollDie(3) - 2, description);

        this.agility = 20 - ( 5 - (this._maxStrength - this.strength));
    }

    generateNewMonster = () => {
        return new Deamon(this.name, this.description);
    }
}