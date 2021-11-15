const Employee = require("./Employee");

class ConsessionsManager extends Employee {

    constructor(name, manager) {
        super(name, manager, true);
    }

    interactWithVisitor = (visitor) => {

        console.log(
            `
                ${visitor.name}: "My soda is flat"
                ${this.name}: "I see, did the cashier offer a new soda?"
                ${visitor.name}: "Yeah, but I don't want another flat soda."
                ${this.name}: "Ok, how a bout a fresh soda and a refund?"
                ${visitor.name}: "Ok."
                ${this.name}: "Here you go, have a GREAT day!"
            `
        )
    }
}

module.exports = ConsessionsManager;