class Character {
    
    description = ""; 
    displayName;
    eventListener = new EventHandler();
    id;
    imageName;
    inventory = new Inventory([]);
    name = "";
    race = "";

    _maxStrength = 0;

    _attackWeapon = null;
    get attackWeapon() {
        return this._attackWeapon;
    }
    set attackWeapon(weapon) {
        this._attackWeapon = weapon;
    }

    _defenseWeapon = null;
    get defenseWeapon() {
        return this._defenseWeapon;
    }
    set defenseWeapon(weapon) {
        this._defenseWeapon = weapon;
    }

    _agility = 0;
    get agility() { 
        return this._agility;
    }
    set agility(newValue) {
        this._agility = newValue;
    }

    get attackPin() {
        return {
                hitValue: (this.strength / this.maxStrength) * 15 + parseInt(this.modifier * 5),
                damage: this.attackWeapon === null ? parseInt(this.modifier * 3) : this.attackWeapon.damage + parseInt(this.modifier * 2),
                actionString: `attackes with their ${this.attackWeapon === null ? "hands" : this.attackWeapon.name}`
            }
    }

    get defendPin() {
        return {
            defense : this.defenseWeapon === null ? parseInt(this.modifier * 2) : this.defenseWeapon.defense + parseInt(this.modifier * 2),
            actionString: `defends with their ${this.defenseWeapon === null ? "hands" : this.defenseWeapon.name}`
        }
    }

    get modifier() {
        return this.agility / this.strength;
    }

    _gold = 0;
    get gold() {
        return this._gold
    }
    set gold(newValue) {
        if ( newValue < 0 ) newValue = 0;
        this._gold = newValue;
        this.eventListener.trigger(GameMaster.EVENTS.CHARACTER_UPDATED);
    }

    _magic = 0;
    get magic() {
        return this._magic
    }
    set magic(newValue) {
        if ( newValue < 0 ) newValue = 0;
        if ( newValue > 5 ) newValue = 5;
        this._magic = newValue;
        this.eventListener.trigger(GameMaster.EVENTS.CHARACTER_UPDATED);
    }

    _strength = 0;
    get strength() {
        return this._strength - parseInt(this.inventory.weight / 1000 / 2);
    }
    set strength(newValue) {
        if ( newValue < 1 ) {
            newValue = 0;
            this.eventListener.trigger(GameMaster.EVENTS.CHARACTER_DIED);
        }

        if ( newValue > this._maxStrength ) newValue = this._maxStrength;

        this._strength = newValue;
        this.eventListener.trigger(GameMaster.EVENTS.CHARACTER_UPDATED);
    }

    constructor(name, race, strength, maxStrength, agility, magic, description) {
        this.name = name;
        this.race = race;
        this._strength = strength;
        this._maxStrength = maxStrength;
        this._agility = agility;
        this._magic = magic;
        this.description = description;

        this.imageName = `character_${race} ${name}`.split(" ").join("_");
        this.id = Tools.generateId();

        this.inventory.eventListener.add(GameMaster.EVENTS.INVENTORY_UPDATED, () => {
            this.eventListener.trigger(GameMaster.EVENTS.CHARACTER_UPDATED)
        })
    }

    //override
    clone = () => new Character(this.name, this.race, this.strength, this.maxStrength, this.agility, this.magic, this.description);
    
    getStats = () => {
        return `strength: ${this.strength}<br>agility: ${this.agility}<br>magic: ${this.magic}`;
    }
}