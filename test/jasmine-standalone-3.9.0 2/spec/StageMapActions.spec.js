describe("StageMapActionsComponent", function() {
    let gameMaster;
    let mapSquare;
    let result;
    let stageMapActions;


    beforeEach(function() {
        gameMaster = new GameMaster(100);
        stageMapActions = new StageMapActionsComponent("#scratch_test", gameMaster);
        //mapSquare = new MapSquare();
        gameMaster.player.mapSquare = new MapSquare(-1, -1);
    })
    
    describe("buildHTML", function() {
        it("should display id, image, title and description", function() {
            let result = stageMapActions._buildHTML("test_id", "test_image", "test_title", "test_description", null);

            expect(result).toContain("test_id");
            expect(result).toContain("test_image");
            expect(result).toContain("test_title");
            expect(result).toContain("test_description");
        })
    })

    describe("create", function() {
        
        describe("create actions for MapSquare objects", function() {

            it("should display pickup item", function() {
                
                mapSquare = gameMaster.player.mapSquare;
                mapSquare.shop = null;
                mapSquare.character = null;
                mapSquare.item = new TestWeapon();
    
                stageMapActions.buildComponent();
                result = stageMapActions._stage.outerHTML;
    
                expect(result).toContain(`${mapSquare.x}:${mapSquare.y}`);
                expect(result).toContain(mapSquare.item.name);
                expect(result).toContain(mapSquare.item.imageName);
                expect(result).toContain(mapSquare.item.getStats());
                expect(result).toContain("--pickup");
            })
    
            it("should display engage monster", function() {
                mapSquare = gameMaster.player.mapSquare;
                mapSquare.character = new TestCharacter();
    
                stageMapActions.buildComponent();
                result = stageMapActions._stage.outerHTML;
    
                expect(result).toContain(`${mapSquare.x}:${mapSquare.y}`);
                expect(result).toContain(`${mapSquare.character.name} ${mapSquare.character.race}`);
                expect(result).toContain(mapSquare.character.imageName);
                expect(result).toContain(mapSquare.character.description);
                expect(result).toContain("--engage");
            })
    
            it("should display go shopping", function() {
                gameMaster.player.mapSquare.place = new TestShop();
                stageMapActions.buildComponent();

                result = stageMapActions._stage.innerHTML;

                expect(result).toContain("the_shop.png");
                expect(result).toContain(gameMaster.player.mapSquare.place.imageName);
                expect(result).toContain("--shop");
            })

            it("should display gold", function() {
                gameMaster.player.mapSquare.gold = 10;
                stageMapActions.buildComponent()

                result = stageMapActions._stage.outerHTML;

                expect(result).toContain("gold.png");
            })
        })

        describe("create actions for player inventory", function() {
            describe("create actions for food items in player inventory", function() {
                it("should display food items", function() {
                    let food = new Food("test_food", 1, 2, 3, "food_description");
                    
                    gameMaster.player.inventory.addItem(food);
        
                    stageMapActions.buildComponent();
                    result = document.querySelector("#scratch_test").innerHTML;
            
                    expect(result).toContain(food.id);
                    expect(result).toContain(food.name);
                    expect(result).toContain(food.imageName);
                    expect(result).toContain("--consume");
                })

                it("should consolidate food similar food items", function() {
                    let food = new Food("test_food", 1, 2, 3, "food_description");
                    
                    gameMaster.player.inventory.addItem(food);
                    gameMaster.player.inventory.addItem(food);
                    gameMaster.player.inventory.addItem(food);
        
                    stageMapActions.buildComponent();
                    result = document.querySelector("#scratch_test").innerHTML;
                    
                    expect(result.split("--consume").length).toEqual(2);
                })
            })

            describe("create actions for non-food items in player inventory", function() {
                it("should offer exchange if there is an item", function() {
                    let playerItem = new TestWeapon();
                    gameMaster.player.inventory.addItem(playerItem);
                    gameMaster.player.mapSquare.item = new TestWeapon();
    
                    stageMapActions.buildComponent();
                    let result = stageMapActions._stage.outerHTML;
        
                    expect(result).toContain(playerItem.id);
                    expect(result).toContain(playerItem.name);
                    expect(result).toContain(playerItem.imageName);
                    expect(result).toContain(playerItem.getStats());
                    expect(result).toContain("--exchange");
                })

                it("should handle if there is nothing on the MapSquare", function() {
                    let playerItem = new TestWeapon();
                    gameMaster.player.inventory.addItem(playerItem);
                    gameMaster.player.mapSquare.place = null;
                    gameMaster.player.mapSquare.item = null;
    
                    stageMapActions.buildComponent();
                    let result = stageMapActions._stage.outerHTML;
        
                    expect(result).toContain(playerItem.id);
                    expect(result).toContain(playerItem.name);
                    expect(result).toContain(playerItem.imageName);
                    expect(result).toContain(playerItem.getStats());
                    expect(result).toContain("--drop");
                })
            })
        })
    })
})

