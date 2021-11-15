describe("Monster Tests", function() {
    var monster;

    beforeEach(function() {
        this.monster = new Monster("t-name", "t-type", 0, 0, 0, 0, "");
    });

    it("should set the imageName", function() {
        expect(this.monster.imageName).toEqual("monster_t-type_t-name")
    });
})