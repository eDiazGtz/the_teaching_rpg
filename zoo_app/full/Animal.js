

class Animal {

    static MOVE_DIRECTIONS = {
        NORTH: "north",
        EAST: "east",
        SOUTH: "south",
        WEST: "west"
    }

    age;
    commonName;
    food;
    marker
    name;
    speed;

    _canFly

    constructor(commonName, name, age, food, marker, speed) {

        this.age = age;
        this.commonName = commonName;
        this.food = food;
        this.name = name;
        this.marker = marker;
        this.speed = speed;
    }

    // override
    giveLikesToEatMessage(){
        console.log(`I am ${this.commonName} like to eat ${this.food}`);
    }

    //override
    fly(direction){
        this.move("flying", direction, this.canFly);
    }

    //override
    walk(direction){
        this.move("walking", direction, false);
    }

    move(movementMode, direction, allowed = true) {

        if ( !allowed ) {
            console.log(`
                ${this.name} the ${this.commonName}
                cannot move like that.
            `)
        } else {
            console.log(`
                ${this.name} the ${this.commonName}
                is ${mode} ${direction}
            `)
        }
    }
}

module.exports = Animal;