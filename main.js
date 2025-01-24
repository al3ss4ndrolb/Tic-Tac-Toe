const Gameboard = {
  gameboard: ["", "", "", "", "", "", "", "", ""],
  placeMarker(index, mark) {
    if (this.gameboard[index] === "") {
      this.gameboard[index] = mark;
    }
  },
  isSquareEmpty(index) {
    return this.gameboard[index] === "";
  },
  reset() {
    this.gameboard = ["", "", "", "", "", "", "", "", ""];
  },
};

const createPlayer = (name, mark) => {
  return { name, mark };
};

const GameFlow = {
  currentPlayer: null,
  players: [],
  gameboard: Gameboard,

  initialize(player1, player2) {
    this.players = [player1, player2];
    this.currentPlayer = player1;
    this.gameboard.reset();
  },

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.players[0]
        ? this.players[1]
        : this.players[0];
  },

  checkForWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.gameboard.gameboard[a] !== "" &&
        this.gameboard.gameboard[a] === this.gameboard.gameboard[b] &&
        this.gameboard.gameboard[a] === this.gameboard.gameboard[c]
      ) {
        return true; // Winner found
      }
    }

    return false; // No winner
  },

  checkForTie() {
    const isBoardFull = this.gameboard.gameboard.every(
      (square) => square !== ""
    );
    const isNoWinner = !this.checkForWinner();
    return isBoardFull && isNoWinner;
  },
};
