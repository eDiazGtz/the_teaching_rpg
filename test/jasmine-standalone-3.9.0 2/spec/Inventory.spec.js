describe("InventoryTests", function() {
    var inventory;
    var item;

    it("should instantiate without list", function() {
        inventory = new Inventory();

        expect(inventory.getItems().length).toEqual(0);
    });

    it("should instantiate with list", function() {
        inventory = new Inventory([
            new Weapon("test_item", "test_type", 0, 0, {min: 0, max: 0}, {min: 0, max: 0}, "")
        ]);

        expect(inventory.getItems().length).toEqual(1);
        expect(inventory.getItems()[0] instanceof Weapon).toEqual(true)
    })

    it("should get item by id", function() {
        item = new InventoryItem("test_item", "test_type", 0, 0, "");
        inventory = new Inventory([item, new InventoryItem("decoy_item", "test_type", 0, 0, "")]);

        // exsists
        expect(inventory.getItem(item.id)).not.toEqual(null);

        // does not exist
        expect(inventory.getItem(item.id).id).toEqual(item.id);
    })

    it("should get item by type + name", function() {
        item = new InventoryItem("test_item", "test_type", 0, 0, "");
        inventory = new Inventory([item, new InventoryItem("decoy_item", "test_type", 0, 0, "")]);

        // exsists
        expect(inventory.getItem(item.id)).not.toEqual(null);

        // does not exist
        expect(inventory.getItem(item.id).id).toEqual(item.id);
    })

    it("should remove an item by id", function() {
        item = new InventoryItem("test_item", "test_type", 0, 0, "");
        inventory = new Inventory([item]);
        inventory.removeItem(item.id);

        expect(inventory.getItems().length).toEqual(0);
    })

    it("should calculate weight correctly", function() {
        inventory = new Inventory([new InventoryItem("test_item", "test_type", 10, 0, ""), new InventoryItem("test_item", "test_type", 3, 0, "")]);

        expect(inventory.weight).toEqual(13);
    })

    it("should search for item by type", () => {

        // has item
        inventory = new Inventory([new TestWeapon()]);
        expect(inventory.searchForItemByName(new TestWeapon().name)).not.toEqual(null);

        // does not have item
        inventory = new Inventory();
        expect(inventory.searchForItemByName(new TestWeapon().name)).toEqual(null);
    })
});