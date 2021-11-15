class Employee {

    isManager;
    manager;
    name;

    constructor(name, manager, isManager = false) {

        this.isManager = isManager;
        this.manager = manager;
        this.name = name;
    }

    // override
    interactWithVisitor(visitor) {}
}

module.exports = Employee;