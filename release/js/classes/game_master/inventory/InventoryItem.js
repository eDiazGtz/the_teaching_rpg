class InventoryItem {

    canUse = false;
    description;
    eventListener = new EventHandler();
    id;
    imageName;
	name = "";
	price;
    priceRange = {min: 0, max: 0};
    type
	weight; // grams

    constructor(name, type, weight, priceRange, description) {
        
        this.id = Tools.generateId();
        this.name = name;
        this.type = type;
        this.weight = weight;
        this.price = Tools.generateRandomNumber(priceRange['min'], priceRange['max']);
        this.priceRange = priceRange;
        this.description = description;

        this.imageName = `item_${(type + " " + name).split(" ").join("_")}`;
    }
    
    generateNewItem(){
        return new InventoryItem(this.name, this.type, this.weight, this.priceRange, this.description);
    }

    getSellPrice = () => {
        return Math.floor(this.price * .6);
    }

    getStats(){
        return `weight: ${this.weight}`;
    }

    // override
    use(map, player){}
}