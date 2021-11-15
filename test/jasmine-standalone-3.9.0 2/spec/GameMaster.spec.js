describe("GameMaster", function() {
    var gameMaster;
    var result
    var spy;

    beforeEach(function() {
        gameMaster = new GameMaster(100);
        gameMaster.sorties = [new TestSortie(gameMaster)];
        gameMaster.player = new TestPlayer();
        gameMaster.player.mapSquare = new MapSquare(99, 99);
        //gameMaster.sortie = new TestSortie(gameMaster);

        spy = spyOn(gameMaster.eventListener, 'trigger');
    })

    it("should freeze and unfreeze", () => {

        gameMaster.mode = GameMaster.MODES.DEMO;

        expect(gameMaster.mode).toEqual(GameMaster.MODES.DEMO);

        gameMaster.frozen = true;
        expect(gameMaster.mode).toEqual(GameMaster.MODES.FROZEN);
    })

    it("should jumpToQuest(questName)", () => { 

        let newSortie = new TestSortie(gameMaster);
        newSortie.name = "target_sortie";
        let targetQuest = new Quest("target_quest", newSortie, new Point(0,0));
        newSortie.quests = [ targetQuest ];
        /* newSortie.quests = [ 
            new TestQuest("", new Sortie, new Point(0,0), [], [
                new CollectableMapItem("", "")
            ]), 
            targetQuest ]; */

        gameMaster.sorties.push( newSortie );
        gameMaster.sortie = null;
        gameMaster.buildWorld();
        gameMaster.gotoNextQuest();

        gameMaster.jumpToQuest("target_quest");

        expect(gameMaster.player.collectedItems.getItems().length).toEqual(1);
    })

    describe("doBattle()", function() {

        it("should return a dialog", function() {
            
            gameMaster.player.mapSquare.character = new TestCharacter();
            let result = gameMaster.doBattle(gameMaster.player.mapSquare);
            expect(result.length).not.toEqual(0);
        })        
    })

    describe("gotoNextQuest", () => {

        it("should move to the next sortie if sortie is completed", () => {

            let testSortie = new TestSortie(null);
            testSortie.quests = [];

            gameMaster.buildWorld();

            console.log(gameMaster);

            gameMaster.gotoNextQuest();
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(GameMaster.EVENTS.SORTIE_STARTED);
        })

        it("should trigger GAME_OVER event when there are no more quests", () => {

            gameMaster.sorties = [];

            gameMaster.gotoNextQuest();
            
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(GameMaster.EVENTS.GAME_OVER);
        })

        it("should set player to starting mapSquare", () => {

            gameMaster.buildWorld();
            gameMaster.gotoNextQuest();
            result = gameMaster.gotoNextQuest();

            expect(gameMaster.player.mapSquare.x).toEqual(9);
            expect(gameMaster.player.mapSquare.y).toEqual(9);
        });
    })

    describe("movePlayer()", () => {

        it("should move to clear and valid mapSquare", () => {
            
            gameMaster.buildWorld();
            gameMaster.gotoNextQuest();
            gameMaster.player.mapSquare = new MapSquare(99, 99);
            gameMaster.sortie.quest.itemsRequiredToCompleteQuest = [ new TestWeapon() ]

            gameMaster.movePlayer(new Point(-1, -1));

            expect(gameMaster.player.mapSquare.x).toEqual(98);
            expect(gameMaster.player.mapSquare.y).toEqual(98);
        });

        it("should do nothing if moving outside of grid", () => {
            gameMaster.movePlayer(new Point(1, 1));
            expect(gameMaster.player.mapSquare.x).toEqual(99);
            expect(gameMaster.player.mapSquare.y).toEqual(99);
        });

        it("should not move if barrier is encountered", () => {

            gameMaster.map.getMap()[98][98].barrier = new Barrier("test", "");

            gameMaster.movePlayer(new Point(-1, -1));
            expect(gameMaster.player.mapSquare.x).toEqual(99);
            expect(gameMaster.player.mapSquare.y).toEqual(99);
        });

        it("should call MapPlace.playerLeaves(map, player)", () => {
            
            gameMaster.buildWorld();
            gameMaster.gotoNextQuest();

            gameMaster.player.mapSquare = new MapSquare(-1, -1);
            gameMaster.player.mapSquare.place = new TestPlace();

            spy = spyOn(gameMaster.player.mapSquare.place, "leave");

            gameMaster.movePlayer(new Point(1,1));

            expect(spy).toHaveBeenCalled();
        })

        it("should NOT call MapPlace.leave() if moving to another square with same place", () => {
            
            gameMaster.buildWorld();
            gameMaster.gotoNextQuest();
            //gameMaster.player.mapSquare = new MapSquare(99, 99);

            gameMaster.player.mapSquare = new MapSquare(-1, -1);
            gameMaster.player.mapSquare.place = new TestPlace();
            gameMaster.map._grid[0][0] = gameMaster.player.mapSquare;

            spy = spyOn(gameMaster.player.mapSquare.place, "leave");

            gameMaster.movePlayer(new Point(1,1));

            expect(spy).not.toHaveBeenCalled();
        })

        xit("should call MapPlace.enter(map, player)", () => {
            
            gameMaster.player.mapSquare = new MapSquare(-1, -1);
            gameMaster.player.mapSquare.place = new TestPlace();

            spy = spyOn(gameMaster.player.mapSquare.place, "leave");

            gameMaster.movePlayer(new Point(1,1));

            expect(spy).toHaveBeenCalled();
        })

        xit("should NOT call MapPlace.enter() if moving to another square with same place", () => {
            gameMaster.player.mapSquare = new MapSquare(-1, -1);
            gameMaster.player.mapSquare.place = new TestPlace();
            gameMaster.map._grid[0][0] = gameMaster.player.mapSquare;

            spy = spyOn(gameMaster.player.mapSquare.place, "playerEnters");

            gameMaster.movePlayer(new Point(1,1));

            expect(spy).not.toHaveBeenCalled();
        })

        it("should go into battle if mapSuare.character == Enemy", () => {
            gameMaster.player.mapSquare = new MapSquare(-1, -1);
            gameMaster.player.mapSquare.character = new TestEnemy();
            gameMaster.map._grid[0][0] = gameMaster.player.mapSquare;

            gameMaster.movePlayer(new Point(1,1));

            expect(spy).toHaveBeenCalled();
            //expect(spy).toHaveBeenCalledWith(GameMaster.EVENTS.START_BATTLE);
        })

    });
})