const Animal = require('./Animal.js');

class Penguin extends Animal {
    
    constructor(name, age) {
        super("penguin", name, age, "fish", "P", 1);
    }
}

module.exports = Penguin;