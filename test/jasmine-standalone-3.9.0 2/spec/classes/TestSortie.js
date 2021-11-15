class TestSortie extends Sortie {

    playerStartLocation = new Point(9,9);

    _barriers = [
        new MapPiecePlacer(new Barrier("", "", ""), [
            new Point(1,1),
            new Range(new Point(3,3), new Point(4,4))
        ])
    ];

    _characters = [
        new MapPiecePlacer(new TestCharacter(), [
            new Point(1,1),
            new Range(new Point(3,3), new Point(4,4))
        ])
    ];

    _items = [
        new MapItem("test_item", "", new Point(1,1))
    ]

    _places = [
        new MapPiecePlacer(
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
        )
    ];

    quests = [
        new TestQuest(this)
    ];

    constructor(
        gameMaster,
        mapRange = new Range(new Point(0,0), new Point(10, 10))
        ) {
        super(gameMaster, "test_sortie", mapRange);

        return this;
    }
}