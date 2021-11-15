class Visitor {

    difficulty; // 0 - 2
    name;

   constructor(name, difficulty) {

        this.difficulty = difficulty;
        this.name = name;
    }
}

module.exports = Visitor;