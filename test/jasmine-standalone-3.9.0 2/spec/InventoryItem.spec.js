describe("InventoryItem", function() {
    var inventoryItem;

    beforeEach(function() {
        inventoryItem = new InventoryItem("willard scott", "daggar", 0, 0, "");
    })

    it("should set the imageName", function() {
         expect(inventoryItem.imageName).toEqual("item_daggar_willard_scott");
    });
});