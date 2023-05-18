import minesweeperMatrix from "./mainClass.js";
import { makecanvas, makeUI } from "./makeUI.js";

let n = 25;
let m = 25;
let minesCount = 1;
let width = 18;
let height = 18;
let scale = 1;
let colors = "light"
width = width * scale;
height = height * scale;
let record = [];

const colorsLight = {
  cellColors: ["#f2f8fe", "#0a7cf5", "#ebf206"],
  mineColors: ["#6C7780", "#ff111f"],
  numFontColor: [
    "#2d0b02",
    "#f6993f",
    "#5e4f02",
    "#38c172",
    "#4dc0b5",
    "#3490dc",
    "#6574cd",
    "#9561e2",
  ],
  flagColors: ["#ef5f10", "#fff", "#ff111f"],
  background: "#fff",
  counters: ["#fff", "#000"]
};

const colorsDark = {
  cellColors: ["#1d131f", "#27a49d", "#f6f6f8"],
  mineColors: ["#D3D3D3", "#ff111f"],
  numFontColor: [
    "#fff",
    "#f6993f",
    "#cfaa0b",
    "#38c172",
    "#4dc0b5",
    "#3490dc",
    "#6574cd",
    "#9561e2",
  ],
  flagColors: ["#ef5f10", "#fff", "#ff111f"],
  background: "#000",
  counters: ["#000", "#fff"]
};

function main(reset) {
  const paddingLeft = 5;
  const paddingTop = 5;
  //let nIntervId = null;
  let matrix = null;

  let [storageMatrix, storageState] = getStorage();
  if (reset) {
    let initialMatrix = new minesweeperMatrix(n, m);
    makecanvas(n, m, scale, initialMatrix.openedMatrix, colors);
  } else if (!storageMatrix) {
    makeUI(state);
    let initialMatrix = new minesweeperMatrix(n, m);
    makecanvas(n, m, scale, initialMatrix.openedMatrix, colors);
  } else {
    state = storageState;
    applyState(state);
    makeUI(state);
    matrix = new minesweeperMatrix();
    matrix.setSettings(storageMatrix);
    if (matrix.size_x < m || matrix.size_y < n) {
      let initialMatrix = new minesweeperMatrix(n, m);
      matrix = null;
      makecanvas(n, m, scale, initialMatrix.openedMatrix, colors);
    } else {
      const turnCounter = document.querySelector(".turns");
      const timeCounter = document.querySelector(".time");
      turnCounter.textContent = storageMatrix.turnsCounts;
      timeCounter.textContent = storageMatrix.timeCounter;
      time = storageMatrix.timeCounter;
      makecanvas(n, m, scale, matrix.openedMatrix,colors);
    }
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
    let isEnd;
    let cell = coordinatesToCell(
      posX,
      posY,
      width,
      height,
      paddingLeft,
      paddingTop
    );
    if (matrix) {
      if (matrix.openedMatrix[cell[0]][cell[1]] === -1) {
        matrix.openCell(cell);
      } else if (matrix.openedMatrix[cell[0]][cell[1]] > 0) {
        matrix.openOnFlags(cell);
      }
      matrix, isEnd = checkEnd(matrix, cell);
      makecanvas(n, m, scale, matrix.openedMatrix,colors);
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
      makecanvas(n, m, scale, matrix.openedMatrix, colors);
      time = 0;
      toggleTimer(matrix);
      matrix, isEnd = checkEnd(matrix, cell);
      makecanvas(n, m, scale, matrix.openedMatrix, colors);
      const canvas = document.querySelector("canvas");
      if (!isEnd) {
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
    let cell = coordinatesToCell(
      posX,
      posY,
      width,
      height,
      paddingLeft,
      paddingTop
    );
    matrix.makeFlag(cell);
    makecanvas(n, m, scale, matrix.openedMatrix,colors);
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
    setStorage(matrix, state);
  });
}

function checkEnd(matrix, cell) {
  let isEnd = matrix.checkWin();
  if (isEnd === 2) {
    alert("Game over. Try again");
    toggleTimer(false);
    matrix.openedMatrix[cell[0]][cell[1]] = 10; // 10 is value for pressed mine
  } else if (isEnd === 1) {
    alert(
      `Hooray! You found all mines in ${time} seconds and ${matrix.turnsCounts + 1} moves!`
    );
    recordChange(matrix);
    toggleTimer(false);
  } else if (!timerID) {
    toggleTimer(matrix);
  }
  return matrix, isEnd;
}

function coordinatesToCell(x, y, width, height, paddingLeft, paddingTop) {
  return [
    Math.floor((y - paddingTop) / height),
    Math.floor((x - paddingLeft) / width),
  ];
}

function setStorage(matrix, state) {
  let jsonMatrix = JSON.stringify(matrix);
  let jsonState = JSON.stringify(state);
  try {
    localStorage.setItem("matrix", jsonMatrix);
    localStorage.setItem("state", jsonState);
  } catch (err) {
    throw err;
  }
}

function getStorage() {
  let matrix = localStorage.getItem("matrix");
  let state = localStorage.getItem("state");
  return [JSON.parse(matrix), JSON.parse(state)];
}

function recordChange(matrix) {
  record.unshift({
    size_x: matrix.size_x,
    size_y: matrix.size_y,
    time: matrix.timeCounter,
    turn: matrix.turnsCounts+1,
  });
  recordMakeNewItem(record[0]);
}

function recordMakeNewItem(item) {
  let recordList = document.querySelector(".records_list");
  if (record.length > 10) {
    record.pop();
    recordList.removeChild(recordList.lastChild);
  }
  let recordTitle = document.querySelector(".records_title");
  const recordItem = document.createElement("li");
  if (!item.time) {
    item.time = 0;
  }
  recordItem.textContent = `Field: ${item.size_y}x${item.size_x}, Time: ${item.time}s, Moves: ${item.turn}`;
  recordItem.classList = "record_item";
  recordTitle.after(recordItem);
}

function toggleTimer(matrix) {
  if (timerID || !matrix) {
    clearInterval(timerID);
    timerID = null;
  } else {
    timerID = setInterval(() => {
      time++;
      document.querySelector(".time").textContent = time;
      matrix.timeCounter = time;
    }, 1000);
  }
}

let timerID = null;
let time;

let state = {
  difficulty: "easy",
  mines: 10,
  theme: "light"
}

main(false);

function applyState(state) {
  switch (state.difficulty) {
    case "easy":
      n = 10;
      m = 10;
      scale = 2;
      break;
    case "medium":
      n = 15;
      m = 15;
      scale = 1.5
      break;
    case "hard":
      n = 25;
      m = 25;
      scale = 1;
      break;
  }
  width = 18 * scale;
  height = 18 * scale;
  
  minesCount = state.mines;

  if (state.theme === 'light') {
    colors = colorsLight;
  } else {
    colors = colorsDark;
  }
}

function eventListenersHandler() {
  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", () => {
    applyState(state);
    const timeCounter = document.querySelector(".time");
    timeCounter.textContent = 0;
    const turnCounter = document.querySelector(".turns");
    turnCounter.textContent = 0;
    toggleTimer(false);
    makeUI(state);
    eventListenersHandler();
    main(true);
  });

  const recordButton = document.querySelector(".records");
  const recordList = document.querySelector(".records_list");
  recordButton.addEventListener("click", () => {
    recordList.classList.toggle("records_list_active");
  });

  const settingsButton = document.querySelector(".settings");
  const settingsList = document.querySelector(".settings_menu");
  settingsButton.addEventListener("click", () => {
    settingsList.classList.toggle("settings_menu_active");
  });
  let slider = document.querySelector(".mines_slider");
  let output = document.querySelector(".mines_value");
  output.textContent = slider.value + " mines";
  slider.addEventListener("input", (event) => {
    output.textContent = event.target.value  + " mines";
    state.mines = event.target.value;
  });

  let difRadio = document.querySelector(".difficulty");
  difRadio.addEventListener("change", (event) => {
    state.difficulty = event.target.value;
  })

  let themeRadio = document.querySelector(".theme");
  themeRadio.addEventListener("change", (event) => {
    state.theme = event.target.value;
  })
}
eventListenersHandler();

