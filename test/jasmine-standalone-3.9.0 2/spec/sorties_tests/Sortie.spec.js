describe("Sortie and children", () => {
    let gameMaster;
    let map;
    let player;
    let sortie;
    let spy;
    
    describe("Sortie", () => {

        beforeEach(() => {
            gameMaster = new GameMaster();

            sortie = new TestSortie(gameMaster, "test", new Range(new Point(0, 0), new Point(10, 10)));
            gameMaster.sorties= [ sortie ];
            gameMaster.buildWorld(10);
            gameMaster.player = new TestPlayer();

            player = gameMaster.player;
            map = gameMaster.map.getMap();
        })
        
        xit("should instantiate with demo script", () => { 

            expect(gameMaster.sortie.getScript("demo")).toBeDefined();
        });

        describe("build()", () => {

            it("should build correctly", () => {

                sortie.build(map, player);
                //gameMaster.gotoNextQuest();

                //let map = gameMaster.map.getMap();

                // characters
                expect(map[1][1].character instanceof Character).toBeTrue();
                expect(map[3][3].character instanceof Character).toBeTrue();
                expect(map[4][3].character instanceof Character).toBeTrue();
                expect(map[3][4].character instanceof Character).toBeTrue();
                expect(map[4][4].character instanceof Character).toBeTrue();

                // places
                for ( let ptr = 1; ptr < 7; ptr ++ ) {
                    expect(map[1][ptr].barrier instanceof CastleWall).toBeTrue(); // north wall
                    expect(map[6][ptr].barrier instanceof CastleWall).toBeTrue(); // south wall
                    expect(map[ptr][6].barrier instanceof CastleWall).toBeTrue(); // east wall
                    expect(map[ptr][1].barrier instanceof CastleWall).toBeTrue(); // west wall
                }

                // barriers
                expect(map[1][1].barrier instanceof Barrier).toBeTrue();
                expect(map[3][3].barrier instanceof Barrier).toBeTrue();
                expect(map[4][3].barrier instanceof Barrier).toBeTrue();
                expect(map[3][4].barrier instanceof Barrier).toBeTrue();
                expect(map[4][4].barrier instanceof Barrier).toBeTrue();

                // items
                expect(map[1][1].item instanceof MapItem).toBeTrue();
            });
        });

        describe("start()" , () => {

            it("should set player.mapSquare", () => {

                sortie = new TestSortie(gameMaster, "test", new Range(new Point(0, 0), new Point(10, 10)));
                sortie.build(map, player);
                sortie.start(map, player);
                //gameMaster.gotoNextQuest();
                
                expect(gameMaster.player.mapSquare).toBe(gameMaster.map.getMap()[9][9]);
            })

            it("should start first quest", () => {
                
                sortie = new TestSortie(gameMaster, "test", new Range(new Point(0, 0), new Point(10, 10)));
                spy = spyOn(document, "dispatchEvent");
                sortie.build(map, player);
                sortie.start(map, player);

                expect(spy).toHaveBeenCalled();
                //expect(spy.).toHaveBeenCalledWith(CustomEvent);
            })
        });

        describe("update()" , () => {

            it("should return false if not completed", () => {

                sortie = new TestSortie(gameMaster, "test", new Range(new Point(0, 0), new Point(10, 10)));
                sortie.quests = [
                    new TestQuest(sortie)
                ]
                sortie.build(map, player);
                sortie.start(map, player);
                //sortie.update(map, player);

                expect(sortie.update(map, player)).toBeFalse();
            })

            it("should return true if completed", () => {

                sortie = new TestSortie(gameMaster, "test", new Range(new Point(0, 0), new Point(10, 10)));
                sortie.build(map, player);
                player.collectedItems.addItem(sortie.quest.itemsRequiredToCompleteQuest[0]);
                sortie.start(map, player);

                expect(sortie.update(map, player)).toBeTrue();
            })
            
            it("should move to the next quest", () => {

            })
        })
    })
})