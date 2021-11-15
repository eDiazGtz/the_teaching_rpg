const Animal = require("./Animal");

class Lion extends Animal {

    constructor(name, age) {
        super("lion", name, age, "people", "L", 2);
    }
}

module.exports = Lion;