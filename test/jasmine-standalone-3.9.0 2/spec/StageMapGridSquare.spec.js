describe("StageMapSquareComponent", function() {
    let gameMaster;
    let mapSquare;
    let mapSquareComp;
    let result;

    beforeEach(function() {
        gameMaster = new GameMaster(100);
        gameMaster.player = new TestPlayer();
        
        document.querySelector("#scratch_test").innerHTML = "";

        mapSquare = new MapSquare(0, 0);
        gameMaster.player.mapSquare = new MapSquare(1,1);

        mapSquareComp = new StageMapSquareComponent(null, gameMaster, new MapSquare(2, 2));
    })

    /* display order
        cover
        player
        barrier
        character / map items
        places
    */

    it("should show empty square", function() {
        mapSquareComp = new StageMapSquareComponent(null, gameMaster, new MapSquare(2, 2));

        result = mapSquareComp.buildComponent();

        expect(result).not.toContain("img");
    })

    it("should display the floor of place", () => {
        mapSquare = new MapSquare(-1, -1);
        mapSquare.place = new MapPlace("test", "", null, new MapPlaceLayout([new Range(new Point(1,1), new Point(10,10))], [], "floor_image", null));

        mapSquareComp = new StageMapSquareComponent(null, gameMaster, mapSquare);
        result = mapSquareComp.buildComponent();

        expect(result).toContain("floor_image");
    })

    it("should display item", function() {
        mapSquare = new MapSquare(-1, -1);
        mapSquare.item = new TestWeapon();

        mapSquareComp = new StageMapSquareComponent(null, gameMaster, mapSquare);
        result = mapSquareComp.buildComponent();

        expect(result).toContain(mapSquare.item.imageName);
    })

    it("should display character", function() {
        mapSquare.character = new TestCharacter();

        mapSquareComp = new StageMapSquareComponent(null, gameMaster, mapSquare);
        result = mapSquareComp.buildComponent();

        expect(result).toContain(mapSquare.character.imageName);
    })

    it("should display shop", function() {
        mapSquare.place = new Shop(
            [new TestWeapon()],
            "", "", null,
            new MapPlaceLayout(
                [new Range(new Point(0,0), new Point(1,1))],
                [], "floor_image_test", null
            )
            );

        mapSquareComp = new StageMapSquareComponent(null, gameMaster, mapSquare);
        result = mapSquareComp.buildComponent();

        expect(result).toContain(mapSquare.place._layout.floorImage);
    })

    it("should display just player", function() {

        mapSquareComp = new StageMapSquareComponent(null, gameMaster, gameMaster.player.mapSquare);
        result = mapSquareComp.buildComponent();

        expect(result.split("<img").length).toEqual(2);
    })

    it("should display player on occupied square", function() {
        gameMaster.player.mapSquare.item = new TestWeapon();

        mapSquareComp = new StageMapSquareComponent(null, gameMaster, gameMaster.player.mapSquare);
        result = mapSquareComp.buildComponent();

        expect(result).toContain(gameMaster.player.imageName);
    });

    xit("should be empty if player mapSquare not set", () => {

        mapSquareComp = new StageMapSquareComponent(null, gameMaster, gameMaster.player.mapSquare);
        result = mapSquareComp.buildComponent();

        expect(result).not.toContain(gameMaster.player.imageName);
    })

    it("should display barrier", () => {
        mapSquare = new MapSquare(-1, -1);
        mapSquare.barrier = new Barrier("test", "", "");

        mapSquareComp = new StageMapSquareComponent(null, gameMaster, mapSquare);
        result = mapSquareComp.buildComponent();

        expect(result).toContain("barrier_test.png");
    })

    describe("cover", () => {

        it("should display cover if MapSquare.cover is set", () => {
            mapSquare = new MapSquare(-1, -1);
            mapSquare.cover = "cover_image.png";
    
            mapSquareComp = new StageMapSquareComponent(null, gameMaster, mapSquare);
            result = mapSquareComp.buildComponent();
    
            expect(result).toContain("cover_image.png");
        })

        it ("should show cover if MapPlace.coverIsVisible == true", () => {
            mapSquare = new MapSquare(-1, -1);
            mapSquare.place = new MapPlace("test", "", null, new MapPlaceLayout(
                [], [], 'floor_image', null, 'cover_image'
            ));

            mapSquare.place.leave(null, gameMaster.player);
    
            mapSquareComp = new StageMapSquareComponent(null, gameMaster, mapSquare);
            result = mapSquareComp.buildComponent();
    
            expect(result).toContain("cover_image.png");
        })

        it ("should NOT show cover if MapPlace.coverIsVisible == false", () => {
            mapSquare = new MapSquare(-1, -1);
            mapSquare.place = new MapPlace("test", "", null, new MapPlaceLayout(
                [], [], 'floor_image', null, 'cover_image'
            ));

            mapSquare.place.enter(null, gameMaster.player);
    
            mapSquareComp = new StageMapSquareComponent(null, gameMaster, mapSquare);
            result = mapSquareComp.buildComponent();
    
            expect(result).not.toContain("cover_image.png");
        })

    })
})