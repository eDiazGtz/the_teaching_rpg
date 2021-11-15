describe("GameBoard", function() {
  var gameBoard = new GameBoard();

  beforeEach(function() {
    gameBoard = new GameBoard()
  });

  it("should be able to play a Song", function() {
    expect(gameBoard.test()).toEqual(true);
  });

});
