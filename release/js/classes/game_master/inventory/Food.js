class Food extends InventoryItem {

    energy = 0;

    constructor(name, weight, price, energy, description) {
        super(name, "food", weight, {min: price, max: price}, description);

        this.energy = energy;

        this.imageName = `food_${name}`.split(" ").join("_");
    }

    generateNewItem = () => {
        return new Food(this.name, this.weight, this.price, this.energy, this.description);
    }
}