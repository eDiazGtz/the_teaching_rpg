const Employee = require("./Employee");

class ConsessionsEmployee extends Employee {

    constructor(name, manager) {
        super(name, manager, false);
    }

    interactWithVisitor = (visitor) => {
        /* employees deal with customers on difficulty 0-1; 
            manager deals with difficulty 2 */

        if ( visitor.difficulty === 0 ) {
            console.log(
                `
                    ${visitor.name}: "My soda is flat"
                    ${this.name}: "Here is a new one."
                    ${visitor.name}: "Thank you!"
                    ${this.name}: "Have a GREAT day!"
                `
            )

        } else if ( visitor.difficulty === 1 ){
            console.log(
                `
                    ${visitor.name}: "My soda is flat"
                    ${this.name}: "Here is a new one."
                    ${visitor.name}: "I don't want another flat soda"
                    ${this.name}: "I just chagned it. It won't be flat"
                    ${visitor.name}: "Ok"
                    ${this.name}: "Here is a new one."
                    ${visitor.name}: "Thank you!"
                    ${this.name}: "Have a GREAT day!"
                `
            )

        } else {
            console.log(
                `
                    ${visitor.name}: "My soda is flat"
                    ${this.name}: "Here is a new one."
                    ${visitor.name}: "I don't want another flat soda"
                    ${this.name}: "I just chagned it. It won't be flat"
                    ${visitor.name}: "I don't care. I don't want another soda."
                    ${this.name}: "Let me get the manager for you"
                `
            )

            this.manager.interactWithVisitor(visitor);
        }
        
    }
}

module.exports = ConsessionsEmployee;