describe("MapPlace", () => {

    let drawingRanges;
    let map;
    let mapPlace;
    let player;

    beforeEach(() => {

        drawingRanges = [
            new Range(new Point(1,1), new Point(4,4)),
            new Range(new Point(5,2), new Point(7,4)),
            new Range(new Point(1,5), new Point(6, 7))
        ];

        map = new Map(10).create().getMap();
        
        mapPlace = new MapPlace("test", "test_desc", null,
            new MapPlaceLayout(
                drawingRanges,
                [
                    new CastleDoor(new Point(6,2), ""),
                    new CastleDoor(new Point(6,6), ""),
                    new CastleDoor(new Point(1,3), "")
                ],
                'map_item_castle.png',
                new CastleWall(),
                "test_cover_image"
            )
        );

        player = new TestPlayer();
    })

    it("should draw the space correctly", () => {

        mapPlace.applyToMap(map);

        drawingRanges.forEach(range => {
            for ( let y = range.start.y; y <= range.end.y; y ++ ) 
                for ( let x = range.start.x; x <= range.end.x; x ++ ) 
                    expect( map[y][x].place instanceof MapPlace).toBeTrue();
        })
    })

    it("should draw the wall correctly", () => {

        // just checking specific points

        let walledPoints = [
            new Point(1,1),
            new Point(4, 1),
            new Point(1, 4),
            // range 2
            // range 3
            new Point(6,5),
            new Point(6,7),
            new Point(1,7)
        ]

        let unwalledPoints = [
            new Point(2,2),
            new Point(3,2),
            new Point(3,3),
            new Point(2,3),
            // range 2
            new Point(4,3),
            new Point(5,3),
            new Point(6,3),
            // range 3
            new Point(2,4),
            new Point(3,4),
            new Point(4,4),
            new Point(5,4)
        ]
        
        mapPlace.applyToMap(map);
        console.log(map);
        walledPoints.forEach(point =>{ console.log(point)
                expect(map[point.y][point.x].barrier instanceof CastleWall).toBeTrue();
            })

        unwalledPoints.forEach(point => {
            expect(map[point.y][point.x].barrier === null).toBeTrue();
        })
    })

    it("should draw doors in correct palces", () => {

        mapPlace.applyToMap(map);
        
        // check either side of door just to make sure testing in correct area
        expect(map[2][6].barrier instanceof CastleWall).not.toBeTrue();
        expect(map[6][6].barrier instanceof CastleWall).not.toBeTrue();
        expect(map[3][1].barrier instanceof CastleWall).not.toBeTrue();
    })

    it("should not draw wall if barrier == null", () => {

        mapPlace = new MapPlace("test", "test_desc", null,
            new MapPlaceLayout(
                [
                    new Range(new Point(1,1), new Point(6,6))
                ],
                [],
                'map_item_castle.png',
                null, null
            )
        );

        mapPlace.applyToMap(map);

        for ( let ptr = 1; ptr < 7; ptr ++ ) {
            expect(map[1][ptr].barrier instanceof CastleWall).not.toBeTrue(); // north wall
            expect(map[6][ptr].barrier instanceof CastleWall).not.toBeTrue(); // south wall
            expect(map[ptr][6].barrier instanceof CastleWall).not.toBeTrue(); // east wall
            expect(map[ptr][1].barrier instanceof CastleWall).not.toBeTrue(); // west wall
        }
    })


    describe("MapPlace.coverIsVisible", () => {

        it("should return false if no coverImage is supplied", () => {
            mapPlace = new MapPlace("test", "test_desc", null,
            new MapPlaceLayout(
                [
                    new Range(new Point(1,1), new Point(6,6))
                ],
                [],
                'map_item_castle.png',
                new CastleWall()
            )
        );

            mapPlace.enter(null, player);
            expect(mapPlace.coverIsVisible).not.toBeTrue();

            mapPlace.leave(null, player);
            expect(mapPlace.coverIsVisible).not.toBeTrue();

        })

        it("should respond based on _playerIsInside if coverMode == AUTO", () => {

            mapPlace.enter(null, player);
            expect(mapPlace.coverIsVisible).not.toBeTrue();

            mapPlace.leave(null, player);
            expect(mapPlace.coverIsVisible).toBeTrue();
        })

        it("should force ON if coverMode == ON", () => {

            mapPlace.coverMode = MapPlace.COVER_MODES.ON;

            mapPlace.enter(null, player);
            expect(mapPlace.coverIsVisible).toBeTrue();

            mapPlace.leave(null, player);
            expect(mapPlace.coverIsVisible).toBeTrue();
        })

        it("should force OFF if coverMode == OFF", () => {

            mapPlace.coverMode = MapPlace.COVER_MODES.OFF;

            mapPlace.enter(null, player);
            expect(mapPlace.coverIsVisible).not.toBeTrue();

            mapPlace.leave(null, player);
            expect(mapPlace.coverIsVisible).not.toBeTrue();
        })
    })

})