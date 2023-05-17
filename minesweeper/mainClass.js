function getRandomInt(min, max) {
  // from MDN Math.random() examples
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getListOFRandomInt(min, max, count, exclude) {
  let listOut = [];
  let newRand = 0;
  while (listOut.length < count) {
    newRand = getRandomInt(min, max);
    if (!listOut.includes(newRand) && newRand != exclude) {
      listOut.push(newRand);
    }
  }
  return listOut.sort((a, b) => a - b);
}

export default class minesweeperMatrix {
  size_x = 0;
  size_y = 0;
  mines = 0;
  initialCell = [0, 0];
  matrix = [];
  openedMatrix = [];
  secondsCount = 0;
  turnsCounts = 0;
  flags = [];
  constructor(n, m) {
    this.size_x = m;
    this.size_y = n;
    for (let i = 0; i < n; i++) {
      this.matrix.push([]);
      this.openedMatrix.push([]);
      for (let j = 0; j < m; j++) {
        this.matrix[i].push(0);
        this.openedMatrix[i].push(-1);
      }
    }
  }

  setSettings(settings) {
    this.size_x = settings.size_x;
    this.size_y = settings.size_y;
    this.mines = settings.mines;
    this.initialCell = settings.initialCell;
    this.matrix = settings.matrix;
    this.openedMatrix = settings.openedMatrix;
    this.secondsCount = settings.secondsCount;
    this.turnsCounts = settings.turnsCounts;
    this.flags = settings.flags;
  }

  fillWithMines(minesCount, initialCell) {
    if (minesCount >= this.size_x * this.size_y) {
      throw new Error("Too much mines for this field!");
    }
    this.initialCell = initialCell;
    this.mines = minesCount;
    const listOfMines = getListOFRandomInt(
      0,
      this.size_x * this.size_y,
      minesCount,
      this.initialCell[0] * this.size_x + this.initialCell[1]
    );
    const indexesOfMines = listOfMines.map((element) => [
      Math.floor(element / this.size_x),
      element % this.size_x,
    ]);
    for (let mine of indexesOfMines) {
      this.matrix[mine[0]][mine[1]] = 9; // 9 - means there is mine in that cell;
    }
  }

  fillRestOfField() {
    for (let i = 0; i < this.size_y; i++) {
      for (let j = 0; j < this.size_x; j++) {
        for (let k = -1; k < 2; k++) {
          // cycle all 8 cells around i,j
          for (let p = -1; p < 2; p++) {
            if (
              this.matrix[i][j] != 9 &&
              i + k >= 0 &&
              i + k < this.size_y &&
              j + p >= 0 &&
              j + p < this.size_x
            ) {
              if (this.matrix[i + k][j + p] == 9) {
                this.matrix[i][j]++;
              }
            }
          }
        }
        if (this.openedMatrix[i][j] === 1) {
          this.openedMatrix[i][j] *= this.matrix[i][j];
        }
      }
    }
  }

  makeFlag(cell) {
    if (this.openedMatrix[cell[0]][cell[1]] === -1) {
      this.openedMatrix[cell[0]][cell[1]] = -2; // -2 reserved for flags;
    } else if (this.openedMatrix[cell[0]][cell[1]] === -2) {
      this.openedMatrix[cell[0]][cell[1]] = -1;
    }
  }

  openCell(cell) {
    if (this.matrix[cell[0]][cell[1]] === 9) {
      this.openedMatrix[cell[0]][cell[1]] = 9;
    } else if (
      this.openedMatrix[cell[0]][cell[1]] === -1 &&
      this.matrix[cell[0]][cell[1]] !== 0
    ) {
      this.openedMatrix[cell[0]][cell[1]] = this.matrix[cell[0]][cell[1]];
    } else if (
      (this.initialCell.toString() === cell.toString() &&
        this.matrix[cell[0]][cell[1]] === 0) ||
      (this.openedMatrix[cell[0]][cell[1]] === -1 &&
        this.matrix[cell[0]][cell[1]] === 0)
    ) {
      this.openedMatrix[cell[0]][cell[1]] = 0;
      for (let k = -1; k < 2; k++) {
        // cycle all 8 console.log("opened", cell)ells around i,j
        for (let p = -1; p < 2; p++) {
          if (
            !(p === 0 && k === 0) &&
            cell[0] + k >= 0 &&
            cell[0] + k < this.size_y &&
            cell[1] + p >= 0 &&
            cell[1] + p < this.size_x
          ) {
            this.openCell([cell[0] + k, cell[1] + p]);
          }
        }
      }
    }
  }

  openOnFlags(cell) {
    let countFlags = 0;
    for (let k = -1; k < 2; k++) {
      for (let p = -1; p < 2; p++) {
        if (
          !(p === 0 && k === 0) &&
          cell[0] + k >= 0 &&
          cell[0] + k < this.size_y &&
          cell[1] + p >= 0 &&
          cell[1] + p < this.size_x
        ) {
          if (this.openedMatrix[cell[0] + k][cell[1] + p] === -2) {
            countFlags++;
          }
        }
      }
    }
    if (countFlags >= this.openedMatrix[cell[0]][cell[1]]) {
      for (let k = -1; k < 2; k++) {
        for (let p = -1; p < 2; p++) {
          if (
            !(p === 0 && k === 0) &&
            cell[0] + k >= 0 &&
            cell[0] + k < this.size_y &&
            cell[1] + p >= 0 &&
            cell[1] + p < this.size_x
          ) {
            if (this.openedMatrix[cell[0] + k][cell[1] + p] != -2) {
              this.openCell([cell[0] + k, cell[1] + p]);
            }
          }
        }
      }
    }
  }

  checkWin() {
    let openedMines = 0;
    for (let line of this.openedMatrix) {
      if (line.includes(9)) openedMines++;
    }
    let unOpenedMines = 0;
    unOpenedMines = this.openedMatrix.reduce((accumulator, current) => {
      for (let element of current) {
        if (element === -1 || element === -2) accumulator++;
      }
      return accumulator;
    }, 0);
    if (this.mines == unOpenedMines && openedMines === 0) {
      return 1;
    } else if (openedMines > 0) {
      for (let i = 0; i < this.size_y; i++) {
        for (let j = 0; j < this.size_x; j++) {
          if (this.openedMatrix[i][j] !== -2 && this.matrix[i][j] === 9) {
            this.openedMatrix[i][j] = 9;
          } else if (
            this.openedMatrix[i][j] === -2 &&
            this.matrix[i][j] !== 9
          ) {
            this.openedMatrix[i][j] = -3; // value for wrong flag
          }
        }
      }
      return 2;
    } else {
      //console.log("Not Yet");
    }
  }

  printAll() {
    for (let i = 0; i < this.size_y; i++) {
      console.log(this.matrix[i]);
    }
  }

  printOpened() {
    for (let i = 0; i < this.size_y; i++) {
      console.log(this.openedMatrix[i]);
    }
  }
}
