describe("Character", function() {
    let character;

    beforeEach(function() {
        character = new TestCharacter();
        character.inventory.addItem(new InventoryItem("", "type", 1000, 0, "description"))
        character.inventory.addItem(new InventoryItem("", "type", 1000, 0, "description"))
        character.inventory.addItem(new InventoryItem("", "type", 1000, 0, "description"))
        character.inventory.addItem(new InventoryItem("", "type", 1000, 0, "description"))
        character.inventory.addItem(new InventoryItem("", "type", 1000, 0, "description"))
        character.strength = 5;
    })

    it("should calculate strength correctly", function() {
        expect(character.strength).toEqual(3);
    })

})