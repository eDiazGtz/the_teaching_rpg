const Animal = require("./Animal");

class Eagle extends Animal {

    constructor(name, age) {
        super("eagle", name, age, "fish", "E", 3);
    }
}

module.exports = Eagle;
