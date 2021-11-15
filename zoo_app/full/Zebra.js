const Animal = require('./Animal.js');

class Zebra extends Animal {

    constructor(name, age) {
        super("zebra", name, age, "grass", "Z", 2);
    }
}

module.exports = Zebra;