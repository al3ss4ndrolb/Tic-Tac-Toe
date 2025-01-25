// Gameboard object
const Gameboard = {
  gameboard: ["", "", "", "", "", "", "", "", ""],

  placeMarker(index, mark) {
    if (this.gameboard[index] === "") {
      this.gameboard[index] = mark;
      return true;
    }
    return false;
  },

  isSquareEmpty(index) {
    return this.gameboard[index] === "";
  },

  reset() {
    this.gameboard = ["", "", "", "", "", "", "", "", ""];
  },
};

// Factory function to create a player
function createPlayer(name, mark) {
  return { name, mark };
}

// GameFlow object
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

    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        this.gameboard.gameboard[a] !== "" &&
        this.gameboard.gameboard[a] === this.gameboard.gameboard[b] &&
        this.gameboard.gameboard[a] === this.gameboard.gameboard[c]
      );
    });
  },

  checkForTie() {
    const isBoardFull = this.gameboard.gameboard.every(
      (square) => square !== ""
    );
    const isNoWinner = !this.checkForWinner();
    return isBoardFull && isNoWinner;
  },
};

// Display Controller
const DisplayController = {
  gameBoard: document.getElementById("game-board"),
  statusDisplay: document.getElementById("game-status"),
  startButton: document.getElementById("start-game"),
  restartButton: document.getElementById("restart-game"),
  player1NameInput: document.getElementById("player1-name"),
  player2NameInput: document.getElementById("player2-name"),

  initialize() {
    this.renderBoard();
    this.setupEventListeners();
  },

  renderBoard() {
    this.gameBoard.innerHTML = "";
    Gameboard.gameboard.forEach((_, index) => {
      const square = document.createElement("div");
      square.classList.add("game-square");
      square.dataset.index = index;
      this.gameBoard.appendChild(square);
    });
  },

  setupEventListeners() {
    this.startButton.addEventListener("click", () => this.startGame());
    this.restartButton.addEventListener("click", () => this.restartGame());
    this.gameBoard.addEventListener("click", (e) => this.handleSquareClick(e));
  },

  startGame() {
    console.log("Start game button clicked");
    const player1Name = this.player1NameInput.value || "Player 1";
    const player2Name = this.player2NameInput.value || "Player 2";
    console.log("Player 1 Name:", player1Name);
    console.log("Player 2 Name:", player2Name);

    const player1 = createPlayer(player1Name, "X");
    const player2 = createPlayer(player2Name, "O");

    GameFlow.initialize(player1, player2);
    this.statusDisplay.textContent = `${GameFlow.currentPlayer.name}'s turn`;
    this.startButton.style.display = "none";
    this.player1NameInput.style.display = "none";
    this.player2NameInput.style.display = "none";
    this.restartButton.style.display = "block";
  },

  restartGame() {
    this.player1NameInput.value = "";
    this.player2NameInput.value = "";
    this.player1NameInput.style.display = "inline";
    this.player2NameInput.style.display = "inline";
    this.startButton.style.display = "inline";
    this.restartButton.style.display = "none";
    this.statusDisplay.textContent = "";
    this.renderBoard();
  },

  handleSquareClick(e) {
    const square = e.target.closest(".game-square");
    if (!square) return;

    const index = square.dataset.index;

    if (GameFlow.gameboard.isSquareEmpty(index)) {
      if (GameFlow.gameboard.placeMarker(index, GameFlow.currentPlayer.mark)) {
        square.textContent = GameFlow.currentPlayer.mark;

        if (GameFlow.checkForWinner()) {
          this.statusDisplay.textContent = `${GameFlow.currentPlayer.name} wins!`;
          this.disableBoard();
        } else if (GameFlow.checkForTie()) {
          this.statusDisplay.textContent = "It's a tie!";
          this.disableBoard();
        } else {
          GameFlow.switchTurn();
          this.statusDisplay.textContent = `${GameFlow.currentPlayer.name}'s turn`;
        }
      }
    }
  },

  disableBoard() {
    this.gameBoard.style.pointerEvents = "none";
  },
};

// Initialize display
DisplayController.initialize();
