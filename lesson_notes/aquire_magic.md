### lesson
    Classes
    polymorphism
    CONSTANTs / magic numbers
    if / then
    access modifiers

### prep
    - Zoo App
        - add Zoo class
        - add a couple of more animals
        - add Visitor class
            - name
            - difficulty ( 0 - 2 )

    - MyAdventure
        - add base Magical Item with no attributes or methods

        - tests :

### lecture
    - add Mammal and Aves
        - review making animals before adding Zebra and Penguin
    - extend Animal into Mammal and Aves
        - extend into Zebra and Penguin
        
    - review Visitor class

    - create Employee
        - interactWithVisitor(visitor)
        - extend into Consessions classes
            - add interactWithCustomer(visitor)
            - cashier & manager
                - extend interactWithVisitor(difficulty)
                - Cashier can handle difficulty 0 - 3
                - Manager handles difficulty 4 - 5

    - add Zoo.moveAnimal(animal, direction)
        - add Zoo.DIRECTIONS constant

    - push updates

### exercises
    - extend Employee class
        - extend into ZooKeeper and TourGuide ( or something easy to have notable differences )
        - discuss with SS unique attributes of new classes
        - how to override interactWithVisitor


### MyAdventure implementation
    - build MagicalItem class
    - extend into Grisham's Heirloom