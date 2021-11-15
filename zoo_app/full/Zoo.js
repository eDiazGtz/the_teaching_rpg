const Animal = require('./Animal.js');
const ConsessionsEmployee = require('./ConsessionsEmployee.js');
const ConsessionsManager = require('./ConsessionsManager.js');
const Visitor = require('./Visitor.js');
const Zebra = require('./Zebra.js');

class Zoo {

    _consessionsEmployee;
    _consessionsManager;

    animals;

    constructor(animals) {

        this.animals = animals;

        this._consessionsManager = new ConsessionsManager("Chuck", null, true);
        this._consessionsEmployee = new ConsessionsEmployee("Fred", this._consessionsManager);
    }

    atConsessions = (visitor) => {

        this._consessionsEmployee.interactWithVisitor(visitor);
    }

    listAnimals = () => {

        for ( let x = 0; x < this.animals.length; x ++ ) {
            console.log(this.animals[x]);
        }

        //this.animals.forEach(animal => console.log(animal));
        /* console.log(
            this.animals.map(animal => animal.name)
        ) */

        //let combinedAges = this.animals.reduce((total, animal) => total + animal.age, 0);

        //console.log(combinedAges);
    }
}

module.exports = Zoo;