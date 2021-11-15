describe("GrishamsShopQuest", () => {

    describe("GrishamShop", () => {
        let gameMaster;
        let result;
        let shop;
        let spy;
    
        beforeEach(() => {
    
            gameMaster = new GameMaster();
            gameMaster.player = new TestPlayer();
            gameMaster.sorties = [new WaterlandSortie(gameMaster)];
            gameMaster.buildWorld();
            gameMaster.gotoNextQuest();
    
            shop = new GrishamsShop(gameMaster.availableItems, gameMaster.sortie);
            spy = spyOn(shop.eventListener, "trigger");
        });
    
        it("should return script first time entering", () => {
    
            result = shop.enter(gameMaster.map.getMap(), gameMaster.player);
    
            expect(result).toBeTrue();
            expect(spy).toHaveBeenCalled();
        })
    
        it("should ask about learning magic if player reenters without having learned", () => {
    
            shop.enter(null, gameMaster.player);
    
            result = shop.enter(null, gameMaster.player);
    
            expect(spy).toHaveBeenCalled();
        })
    })
});