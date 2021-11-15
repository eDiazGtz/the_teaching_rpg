describe("CeruleanCompass", () => {

    let compass = new CeruleanCompass(new Point(0,0))
    let map;
    let mapSquare;
    let player;

    beforeEach(() => {

        map = new Map(5).create().getMap();
        player = new TestPlayer();
        player.mapSquare = map[3][3];
    });

    it ("should clear cover of all squares in a place if player is in that place", () => {

        let place = new TestPlace();
        map[3][3].place = place;
        map[0][0].place = place;
        map[0][0].cover = "test_cover";
        map[4][4].place = place;
        map[4][4].cover = "test_cover";

        compass.use(map, player);

        expect(map[0][0].cover).toBeNull();
        expect(map[4][4].cover).toBeNull();
    });
    
    it ("should not work if player is not in a place", () => {
        
        let spy = spyOn(compass.eventListener, "trigger");

        compass.use(map, player);

        expect(spy).toHaveBeenCalled();
    });
})