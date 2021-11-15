describe("Barrier class", () => {
    let barrier;

    beforeEach(() => {
        barrier = new Barrier("test_name", "test_deny");
    })

    it("should deny all", () => {
        let response = barrier.canPlayerPass(new TestPlayer());

        expect(response.canPass).toEqual(false);
        expect(response.response).toEqual("test_deny");
    })
})