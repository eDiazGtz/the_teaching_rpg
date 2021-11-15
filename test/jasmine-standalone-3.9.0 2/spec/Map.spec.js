describe("Map", function() {
    var map;

	beforeEach(() => {

		map = new Map(5).create();
	})

	it("should crete an empty map", function() {

		expect(map.getMap().length).toEqual(5);
		expect(map.getMap()[0].length).toEqual(5);
	})

	it("should getMapRange()", () => {

		mapRange = new Map(20).create().getRange(new Range(new Point(1,1), new Point(4,4)));

		expect(mapRange.length).toEqual(4);
		expect(mapRange[0].length).toEqual(4);
		expect(mapRange[0][0].x).toEqual(1);
	})

	it("should getMapSquare(point)", () => {

		expect(map.getMapSquare(new Point(2,2))).toBe(map._grid[2][2]);
	})
});