class Player extends Character {

    collectedItems = new Inventory();
    mapSquare;
    
    set name(val) {
        super.name = val;
        this._displayName = `${this.name} the ${this.race}`;
    }

    constructor(race, strength, maxStrength, agility, magic, description) {
        super("", race, strength, maxStrength, agility, magic, description);

        this.imageName = `player_${race.split(" ").join("_")}`;
        this.gold = 30;
        this.displayName = `${this.name} the ${this.race}`;
    }

    consume = (foodItemId) => {
        let food = this.inventory.getItem(foodItemId);
        this._strength += parseInt(food.energy / 2);

        this.inventory.removeItem(foodItemId);
        this.eventListener.trigger(GameMaster.EVENTS.PLAYER_UPDATED);
    }
}