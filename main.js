const Gameboard = {
  gameboard: ["", "", "", "", "", "", "", "", ""],
};

const placeMarker = (index, mark) => {
  if (this.gameboard[index] === "") {
    this.gameboard[index] = mark;
  }
};

const isSquareEmpty = (index) => {
  return this.gameboard[index] === "";
};

const reset = () => {
  this.gameboard = ["", "", "", "", "", "", "", "", ""];
};

const createPlayer = (name, mark) => {
  return { name, mark };
};
