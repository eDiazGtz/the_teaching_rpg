describe("Shop Tests", function() {
    
    var item;
    var player;
    var shop;

    beforeEach(function() {
        item = new InventoryItem("test_name", "test_type", 0, {min: 10, max: 10}, 0, "");
        player = new Player("test_player", "test_race", 0, 0, 0, 0, "test_description")
        shop = new Shop([item], "", "", null, new MapPlaceLayout());
    })

    xdescribe("build", function() {
        it("should build", function() {

        })
    })

    describe("Sell", function() {

        it("should return INVALID ITEM if not found", function() {
            expect(shop.sellItem("asdfefr", player)).toEqual(Shop.SELL_RESULT.INVALID_ITEM);
        })

        it("should sell item if player does not already have", function() {
            let itemToSell = shop.getInventory()[0];
            let soldItem = shop.sellItem(itemToSell.id, player);
          
            expect(soldItem.id).toEqual(itemToSell.id);
            expect(player.gold).toEqual(20);
            expect(player.inventory.getItems().length).toEqual(1);
            expect(shop.getInventoryItem(soldItem.id)).toEqual(null);
        })

        xit("should not remove food from shop inventory", function() {
            let foodItem = new Food("test_food", 0, 10, 0, "");
            shop.inventory.addItem(foodItem)
            let soldItem = shop.sellItem(foodItem.id, player);
            expect(soldItem.id).toEqual(foodItem.id);
            expect(player.gold).toEqual(20);
            expect(player.inventory.getItems().length).toEqual(1);
            expect(shop.inventory.getItem(soldItem.id)).toEqual(foodItem);
        });
    
        xit("should not sell non-food item if the player already has", function() {
            
            player.inventory.addItem(item);
            expect(shop.sellItem(item.id, player)).toEqual(Shop.SELL_RESULT.ALREADY_OWNS);
            expect(player.inventory.getItems().length).toEqual(1);
        })
    
        it("should sell food item even if player already has", function() {
            item = new Food("test_food", 0, 10, 0, "");
            shop.addInventoryItem(item);
            player.inventory.addItem(item);
            
            let soldItem = shop.sellItem(item.id, player);
            expect(soldItem.type + soldItem.name).toEqual(item.type + item.name);
            expect(player.gold).toEqual(20);
            expect(player.inventory.getItems().length).toEqual(2);
        })

        it("should return insufficient funds", function() {
            item = new Food("test_food", 0, 10, 0, "");
            shop.addInventoryItem(item);
            player.gold = 5;
            expect(shop.sellItem(item.id, player)).toEqual(Shop.SELL_RESULT.INSUFFICIENT_FUNDS);
            expect(player.gold).toEqual(5);
            expect(player.inventory.getItems().length).toEqual(0);
        })
    })

    describe("buy", function() {
        it("should buy item", function() {
            shop = new TestShop([new TestWeapon()]);
            player.inventory.addItem(item);
            shop.buyItem(item.id, player);
            expect(player.gold).toEqual(30 + item.getSellPrice());
            expect(player.inventory.getItems().length).toEqual(0);
            expect(shop.getInventoryItem(item.id)).toEqual(item);
        })

        it("should remove the selected item only; not all of the same type", function() {

        });
    });
});