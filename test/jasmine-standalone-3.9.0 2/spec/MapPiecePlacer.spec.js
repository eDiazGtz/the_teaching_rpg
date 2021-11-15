describe("MapPiecePlacer", () => {
    let map;
    let mapPiecePlacer;

    beforeEach(() => {
        map = new Map(20).create().getMap();
    })

    it("should place places", () => {
        
        mapPiecePlacer = new MapPiecePlacer(
            new MapPlace("test", "test_desc", null,
                new MapPlaceLayout(
                    [
                        new Range(new Point(1,1), new Point(6,6))
                    ],
                    [],
                    'map_item_castle.png',
                    new CastleWall()
                )
            ),
            [new Point(1, 1)]
        );

        mapPiecePlacer.applyToMap(map);
        
        for ( let ptr = 1; ptr < 7; ptr ++ ) {
            expect(map[1][ptr].barrier instanceof CastleWall).toBeTrue(); // north wall
            expect(map[6][ptr].barrier instanceof CastleWall).toBeTrue(); // south wall
            expect(map[ptr][6].barrier instanceof CastleWall).toBeTrue(); // east wall
            expect(map[ptr][1].barrier instanceof CastleWall).toBeTrue(); // west wall
        }
    })

    it("should place characters", () => {
        
        mapPiecePlacer = new MapPiecePlacer(new TestCharacter(), [
            new Point(1,1),
            new Range(new Point(3,3), new Point(4,4))
        ]).applyToMap(map);

        // single
        expect(map[1][1].character instanceof Character).toBeTrue();

        // multiple
        expect(map[3][3].character instanceof Character).toBeTrue();
        expect(map[4][3].character instanceof Character).toBeTrue();
        expect(map[3][4].character instanceof Character).toBeTrue();
        expect(map[4][4].character instanceof Character).toBeTrue();

        // no strays
        let count = 0;
        for ( let y = 0 ; y < 10; y ++ )
            for ( let x = 0; x < 10; x ++ )
                if ( map[y][x].character instanceof Character ) count ++;

        expect(count).toEqual(5);
    })

    it("should place barriers", () => {
         mapPiecePlacer = new MapPiecePlacer(new Barrier("", "", ""), [
            new Point(1,1),
            new Range(new Point(3,3), new Point(4,4))
        ]).applyToMap(map);

        // single
        expect(map[1][1].barrier instanceof Barrier).toBeTrue();

        // multiple
        expect(map[3][3].barrier instanceof Barrier).toBeTrue();
        expect(map[4][3].barrier instanceof Barrier).toBeTrue();
        expect(map[3][4].barrier instanceof Barrier).toBeTrue();
        expect(map[4][4].barrier instanceof Barrier).toBeTrue();

        // no strays
        let count = 0;
        for ( let y = 0 ; y < 10; y ++ )
            for ( let x = 0; x < 10; x ++ )
                if ( map[y][x].barrier instanceof Barrier ) count ++;

        expect(count).toEqual(5);
    })
})