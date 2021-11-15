describe("ItemSelector", function() {
    let gameMaster;
    let item;
    let itemSelector;
    
    beforeEach(() => {
        item = new TestWeapon();

        gameMaster = new GameMaster(100);
        gameMaster.player = new TestPlayer();
        gameMaster.player.inventory.addItem(item);
        itemSelector = new ItemSelectorComponent("#scratch_test", gameMaster, "test_id", null);
    })

    it("should build correctly", function() {
        itemSelector.buildComponent();
        let result = document.querySelector("#scratch_test").outerHTML;

        expect(result).toContain(`--test_id`);
        expect(result).toContain(item.id);
        expect(result).toContain(item.imageName);
        expect(result).toContain(item.name);
        expect(result).toContain(item.getStats())
        expect(result).not.toContain("item_selector__inner--selected");
    })

    it("should flag if selected", function() {
        itemSelector = new ItemSelectorComponent("#scratch_test", gameMaster, "test_id", item);

        itemSelector.buildComponent();
        let result = document.querySelector("#scratch_test").outerHTML;

       expect(result).toContain("item_selector__inner--selected");
    })

})