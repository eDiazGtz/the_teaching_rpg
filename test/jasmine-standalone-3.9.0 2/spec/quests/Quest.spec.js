describe("Quest", () => {
    let map;
    let player;
    let quest;
    let result;

    beforeEach(() => {

        map = new Map(10).create();
        player = new TestPlayer();
        quest = new Quest("", new TestSortie(null), new Point(1,1), [], [
            new TestWeapon()
        ])
    })

    it("should insertPlayer()", () => {

        quest.insertPlayer(map.getMap(), player);

        expect(player.mapSquare).toBe(map.getMapSquare(new Point(1,1)));
    });

    it("should skip", () => {

        let item = new TestWeapon();
        quest.itemsRequiredToCompleteQuest = [ item ];

        quest.skip(map, player);

        expect(player.collectedItems.searchForItemByName(item.name)).toBe(item);
    })

    describe ("update()", () => {

        it("should return false if not all items have been gathered", () => {

            result = quest.update(null, player);

            expect(result).not.toBeTrue();
        });

        it("should return true if all items have been gathered", () => {

            player.collectedItems.addItem(new TestWeapon());

            result = quest.update(null, player);

            expect(result).toBeTrue();
        })
    })
})