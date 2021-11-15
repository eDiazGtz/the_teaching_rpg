/* add_players lesson */
/* !!! Students need Node installed !!! */

const Animal = require('./Animal.js');
const Penguin = require('./Penguin.js');
const Visitor = require('./Visitor.js');
const Zebra = require('./Zebra.js');
const Zoo = require('./Zoo.js');

let zebra = new Animal("zebra", "Zak", 10, "grass", "Z", 2);
let penguin = new Animal("penguin", "Tiny", 3, "fish", "P", 1);

console.log(zebra);
console.log(penguin);

console.log(zebra.giveLikesToEatMessage());
console.log(penguin.giveLikesToEatMessage());

// you don't necessarily have to use variables
console.log(new Animal("giraffe", "Lilly", 3, "leaves", "G", 2));

zebra = new Zebra("Zak", 10);
penguin = new Penguin("Tiny", 3);

console.log(zebra);
console.log(penguin);


/* aquire_magic lesson */

let zoo = new Zoo(
    [
        new Zebra("Zak", 10),
        new Penguin("Tiny", 3)
    ]
);

console.log(zoo);

let visitor_0 = new Visitor("Bob", 0);
let visitor_1 = new Visitor("Steve", 1);
let visitor_2 = new Visitor("Ralph", 2);

zoo.atConsessions(visitor_0);
zoo.atConsessions(visitor_1);
zoo.atConsessions(visitor_2);
