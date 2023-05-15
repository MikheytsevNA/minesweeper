import minesweeperMatrix from "./mainClass.js";
import { makecanvas, makeUI } from "./makeUI.js";
//import makeUI from "./makeUI.js";

function main(reset) {
  const n = 15;
  const m = 15;
  const minesCount = 10;
  const paddingLeft = 10;
  const paddingTop = 10;
  //let nIntervId = null;
  let matrix = null;

  let storageMatrix = getStorage();
  if (reset) {
    let initialMatrix = new minesweeperMatrix(n, m);
    makecanvas(n, m, initialMatrix.openedMatrix);
  } else if (!storageMatrix) {
    makeUI();
    let initialMatrix = new minesweeperMatrix(n, m);
    makecanvas(n, m, initialMatrix.openedMatrix);
  } else {
    makeUI();
    matrix = new minesweeperMatrix();
    matrix.setSettings(storageMatrix);
    const turnCounter = document.querySelector(".turns");
    const timeCounter = document.querySelector(".time");
    turnCounter.textContent = storageMatrix.turnsCounts;
    timeCounter.textContent = storageMatrix.timeCounter;
    time = storageMatrix.timeCounter;
    makecanvas(n, m, matrix.openedMatrix);
  }

  const canvas = document.querySelector("canvas");
  canvas.addEventListener("click", clickHandler);

  function clickHandler(event) {
    const turnCounter = document.querySelector(".turns");
    const timeCounter = document.querySelector(".time");
    if (event.button === 0) {
      leftClickHndler(event, timeCounter, turnCounter);
      matrix.turnsCounts++;
    } else if (event.button === 2) {
      rightClickHndler(event);
    }
    turnCounter.textContent = matrix.turnsCounts;
    matrix.turnsCounts = matrix.turnsCounts;
  }

  function leftClickHndler(event, timeCounter, turnCounter) {
    let target = event.target;
    const rect = target.getBoundingClientRect();
    let posX = event.clientX - rect.left;
    let posY = event.clientY - rect.top;
    let cell = coordinatesToCell(posX, posY, 24, 24, paddingLeft, paddingTop);
    if (matrix) {
      if (matrix.openedMatrix[cell[0]][cell[1]] === -1) {
        matrix.openCell(cell);
      } else if (matrix.openedMatrix[cell[0]][cell[1]] > 0) {
        matrix.openOnFlags(cell);
      }
      let isEnd = matrix.checkWin();
      if (isEnd === 2) {
        alert("Game over. Try again");
        toggleTimer(matrix);
        timerID = null;
        matrix.openedMatrix[cell[0]][cell[1]] = 10; // 10 is value for pressed mine
      } else if (isEnd === 1) {
        alert(
          `Hooray! You found all mines in ${timeCounter.textContent} seconds and ${turnCounter.textContent} moves!`
        );
        recordCheck(matrix);
        toggleTimer(matrix);
        timerID = null;
      }
      makecanvas(n, m, matrix.openedMatrix);
      if (!timerID) {
        toggleTimer(matrix);
      }
      const canvas = document.querySelector("canvas");
      if (!isEnd) {
        canvas.addEventListener("click", clickHandler);
        canvas.addEventListener("contextmenu", clickHandler);
      }
    } else {
      matrix = new minesweeperMatrix(n, m);
      matrix.fillWithMines(minesCount, cell);
      matrix.fillRestOfField();
      matrix.openCell(cell);
      makecanvas(n, m, matrix.openedMatrix);
      time = 0;
      toggleTimer(matrix);
      let isWin = matrix.checkWin();
      const canvas = document.querySelector("canvas");
      if (!isWin) {
        canvas.addEventListener("click", clickHandler);
        canvas.addEventListener("contextmenu", clickHandler);
      }
    }
  }

  function rightClickHndler(event) {
    let target = event.target;
    const rect = target.getBoundingClientRect();
    let posX = event.clientX - rect.left;
    let posY = event.clientY - rect.top;
    let cell = coordinatesToCell(posX, posY, 24, 24, paddingLeft, paddingTop);
    matrix.makeFlag(cell);
    makecanvas(n, m, matrix.openedMatrix);
    let isWin = matrix.checkWin();
    const canvas = document.querySelector("canvas");
    if (!isWin) {
      canvas.addEventListener("click", clickHandler);
      canvas.addEventListener("contextmenu", clickHandler);
    }
    event.preventDefault();
  }
  window.addEventListener("beforeunload", () => {
    matrix.timeCounter = time;
    setStorage(matrix);
  });
}

function coordinatesToCell(x, y, width, height, paddingLeft, paddingTop) {
  return [
    Math.floor((y - paddingTop) / height),
    Math.floor((x - paddingLeft) / width),
  ];
}

function setStorage(matrix) {
  let jsonMatrix = JSON.stringify(matrix);
  try {
    localStorage.setItem("matrix", jsonMatrix);
  } catch (err) {
    throw err;
  }
}

function getStorage() {
  let matrix = localStorage.getItem("matrix");
  return JSON.parse(matrix);
}

function recordCheck(matrix) {}
function toggleTimer(matrix) {
  if (timerID || !matrix) {
    console.log(123);
    clearInterval(timerID);
    timerID = null;
  } else {
    console.log(321);
    timerID = setInterval(() => {
      time++;
      document.querySelector(".time").textContent = time;
      matrix.timeCounter = time;
    }, 1000);
  }
}

let timerID = null;
let time;

main(false);

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
  const timeCounter = document.querySelector(".time");
  timeCounter.textContent = 0;
  const turnCounter = document.querySelector(".turns");
  turnCounter.textContent = 0;
  toggleTimer(false);

  main(true);
});
