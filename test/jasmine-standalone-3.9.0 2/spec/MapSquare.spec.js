describe("MapSquare", () => {
    let mapSquare;

    beforeEach(() => {
        mapSquare = new MapSquare(0, 0);
    });

    it("should updateFrom Sample", () => {

        let newMapSquare = new MapSquare(0,1);
        newMapSquare.item = new TestWeapon();
        newMapSquare.character = new TestCharacter();
        newMapSquare.gold = 5;
        newMapSquare.place = new TestShop();

        mapSquare.updateFromSample(newMapSquare);

        expect(mapSquare.item instanceof TestWeapon).toBeTrue();
        expect(mapSquare.character instanceof TestCharacter).toBeTrue();
        expect(mapSquare.place instanceof Shop).toBeTrue();
    });
})