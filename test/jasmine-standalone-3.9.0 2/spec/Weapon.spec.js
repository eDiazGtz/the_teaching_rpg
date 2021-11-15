describe("Weapon Tests", function() {
    var weapon;

    beforeEach(function() {
        this.weapon = new Weapon("t-name", "t-type", 0, 0, {min: 0, max: 0}, {min: 0, max: 0}, "");
    });

    it("should set the imageName", function() {
        expect(this.weapon.imageName).toEqual("weapon_t-type_t-name")
    });
})