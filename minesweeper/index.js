import minesweeperMatrix from './mainClass.js';
import makecanvas from './makeUI.js';

function main() {
  let matrix = new minesweeperMatrix(10, 10, [2, 1]);
  matrix.fillWithMines(10);
  matrix.fillRestOfField();
  /* matrix.printAll();
  matrix.makeFlag([2, 0]);
  matrix.makeFlag([2, 2]);
  matrix.openOnFlags([2, 1])
  matrix.checkWin();
  console.log(123);
  matrix.printOpened(); */
  matrix.printAll()
  makecanvas(10, 10, matrix.matrix);
}

main();