describe("StageMap", function() {
    let gameMaster;
    let stage;
    let stageHTML;
    let stageMap;

    beforeEach(function() {

        stage = document.querySelector("#scratch_test");
        let div = document.createElement("div");
        div.id = "map__actions";
        stage.appendChild(div);

        player = new TestPlayer();
        player.mapSquare = new MapSquare(0, 0);

        gameMaster = new GameMaster();
        gameMaster.sorties = [
            new TestSortie(
                gameMaster,
                new Range(new Point(0,0), new Point(5,5))
            )
        ]
        gameMaster.player = player;
        gameMaster.map = new Map(30).create();

        stageMap = new StageMapComponent("#scratch_test", gameMaster);

        gameMaster.buildWorld();
        gameMaster.gotoNextQuest();
    });

    it("should have the correct range", function() {
        
        gameMaster.player.mapSquare = gameMaster.map.getMap()[5][5];

        stageMap.buildComponent();
        stageHTML = stage.innerHTML;
        
        for( var x = 2; x <= 6; x ++ )
            for( var y = 2; y <= 6; y ++ )
                expect(stageHTML).toContain(`${x}:${y}`);

    })

    it("should adjust for being near the edge", function() {

        // top left
        gameMaster.player.mapSquare = gameMaster.map.getMap()[2][2];
        stageMap.buildComponent();
        stageHTML = stage.innerHTML;

        for( var x = 0; x < 5; x ++ )
            for( var y = 0; y < 5; y ++ )
                expect(stageHTML).toContain(`${x}:${y}`);

        //top right
        gameMaster.player.location = gameMaster.map.getMap()[1][7];
        stageMap.buildComponent();
        stageHTML = stage.innerHTML;

        for( var x = 5 ; x < 10; x ++ )
            for( var y = 0; y < 5; y ++ )
                expect(stageHTML).toContain(`${x}:${y}`);

        //bottom left
        gameMaster.player.location = gameMaster.map.getMap()[7][1];
        stageMap.buildComponent();
        stageHTML = stage.innerHTML;

        for( var x = 0 ; x < 5; x ++ )
            for( var y = 5; y < 10; y ++ )
                expect(stageHTML).toContain(`${x}:${y}`);

        //bottom right
        gameMaster.player.location = gameMaster.map.getMap()[7][7];
        stageMap.buildComponent();
        stageHTML = stage.innerHTML;

        for( var x = 5 ; x < 10; x ++ )
            for( var y = 5; y < 10; y ++ )
                expect(stageHTML).toContain(`${x}:${y}`);
                
    })

    describe("placing player", function() {
        it("should place in center when view is within the bounds of the map", function() {
            gameMaster.layer = player;
            gameMaster.map = new Map(30).create();
            player.location = {x:4, y: 4};

            //let mapHTML = stageMap.buildView(player, gameMaster.map.getMap());
        })
    
    })
})