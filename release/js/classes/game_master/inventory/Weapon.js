class Weapon extends InventoryItem {

    damage = 0;
    damageRange = {min: 0, max: 0};
    defense = 0;
    defenseRange = {min: 0, max: 0};

    constructor(name, type, weight, priceRange, damageRange, defenseRange, description) {
        super(name, type, weight, priceRange, description);

        this.damageRange = damageRange;
        this.defenseRange = defenseRange;

        this.damage = Tools.generateRandomNumber(damageRange['min'], damageRange['max']);
        this.defense = Tools.generateRandomNumber(defenseRange['min'], defenseRange['max']);

        this.imageName = `weapon_${type} ${name}`.split(" ").join("_");
    }

    getStats(){
        return `weight: ${this.weight} | damage: ${this.damage} | defense: ${this.defense}`;
    }

    generateNewItem = () => {
        return new Weapon(this.name, this.type, this.weight, this.priceRange, this.damageRange, this.defenseRange, this.description);
    }
}