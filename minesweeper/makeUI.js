export { makecanvas, makeUI };

function makeUI(currentState) {
  if (document.querySelector(".container")) {
    document.querySelector(".container").remove(".container");
  }

  const container = document.createElement("div");
  container.classList = "container";

  const top_panel = document.createElement("div");
  top_panel.classList = "top_panel";

  const turns = document.createElement("div");
  turns.classList = "turns_count";

  const turnsText = document.createElement("div");
  turnsText.textContent = "Moves";
  turnsText.classList = "turns_text";

  const turnsCount = document.createElement("div");
  turnsCount.textContent = "0";
  turnsCount.classList = "turns";
  if (currentState.theme === "light") {
    turns.style.backgroundColor = "#fff";
    turns.style.color = "#000";
  } else {
    turns.style.backgroundColor = "#000";
    turns.style.color = "#fff";
  }
  turns.append(turnsText);
  turns.append(turnsCount);

  const time = document.createElement("div");
  time.classList = "time_count";

  const timeText = document.createElement("div");
  timeText.textContent = "Timer";
  timeText.classList = "time_text";

  const timeCount = document.createElement("div");
  timeCount.textContent = "0";
  timeCount.classList = "time";
  if (currentState.theme === "light") {
    time.style.backgroundColor = "#fff";
    time.style.color = "#000";
  } else {
    time.style.backgroundColor = "#000";
    time.style.color = "#fff";
  }
  time.append(timeText);
  time.append(timeCount);

  const reset = document.createElement("img");
  reset.classList = "reset";
  if (currentState.theme === "light") {
    reset.setAttribute("src", "./reset.svg");
  } else {
    reset.setAttribute("src", "./reset_dark.svg");
  }

  reset.setAttribute("alt", "reset");

  const settings = document.createElement("img");
  settings.classList = "settings";
  if (currentState.theme === "light") {
    settings.setAttribute("src", "./settings.svg");
  } else {
    settings.setAttribute("src", "./settings_dark.svg");
  }
  settings.setAttribute("alt", "settings");

  const settingsMenu = document.createElement("div");
  settingsMenu.classList = "settings_menu";

  const theme = document.createElement("div");
  theme.classList = "theme";
  const lightTheme = document.createElement("input");
  lightTheme.setAttribute("type", "radio");
  lightTheme.setAttribute("name", "theme");
  lightTheme.setAttribute("value", "light");
  lightTheme.setAttribute("id", "light_difficulty");
  const lightLabel = document.createElement("label");
  lightLabel.setAttribute("for", "light_difficulty");
  lightLabel.textContent = "Light";

  const darkTheme = document.createElement("input");
  darkTheme.setAttribute("type", "radio");
  darkTheme.setAttribute("name", "theme");
  darkTheme.setAttribute("value", "dark");
  darkTheme.setAttribute("id", "dark_difficulty");
  const darkLabel = document.createElement("label");
  darkLabel.setAttribute("for", "dark_difficulty");
  darkLabel.textContent = "Dark";

  switch (currentState.theme) {
    case "light":
      lightTheme.checked = true;
      break;
    case "dark":
      darkTheme.checked = true;
      break;
  }

  theme.append(lightTheme);
  theme.append(lightLabel);

  theme.append(darkTheme);
  theme.append(darkLabel);

  const difficulty = document.createElement("div");
  difficulty.classList = "difficulty";
  const easyDif = document.createElement("input");
  easyDif.setAttribute("type", "radio");
  easyDif.setAttribute("name", "difficulty");
  easyDif.setAttribute("value", "easy");
  easyDif.setAttribute("id", "easy_difficulty");
  const easyLabel = document.createElement("label");
  easyLabel.setAttribute("for", "easy_difficulty");
  easyLabel.textContent = "Easy";

  const mediumDif = document.createElement("input");
  mediumDif.setAttribute("type", "radio");
  mediumDif.setAttribute("name", "difficulty");
  mediumDif.setAttribute("value", "medium");
  mediumDif.setAttribute("id", "medium_difficulty");
  const mediumLabel = document.createElement("label");
  mediumLabel.setAttribute("for", "medium_difficulty");
  mediumLabel.textContent = "Medium";

  const hardDif = document.createElement("input");
  hardDif.setAttribute("type", "radio");
  hardDif.setAttribute("name", "difficulty");
  hardDif.setAttribute("value", "hard");
  hardDif.setAttribute("id", "hard_difficulty");
  const hardLabel = document.createElement("label");
  hardLabel.setAttribute("for", "hard_difficulty");
  hardLabel.textContent = "Hard";

  switch (currentState.difficulty) {
    case "easy":
      easyDif.checked = true;
      break;
    case "medium":
      mediumDif.checked = true;
      break;
    case "hard":
      hardDif.checked = true;
      break;
  }

  difficulty.append(easyDif);
  difficulty.append(easyLabel);
  difficulty.append(mediumDif);
  difficulty.append(mediumLabel);
  difficulty.append(hardDif);
  difficulty.append(hardLabel);

  const mines = document.createElement("div");
  mines.classList = "mines";
  const minesSlider = document.createElement("input");
  minesSlider.setAttribute("type", "range");
  minesSlider.setAttribute("min", 10);
  minesSlider.setAttribute("max", 99);
  minesSlider.setAttribute("value", currentState.mines);
  minesSlider.classList = "mines_slider";
  const minesValue = document.createElement("span");
  minesValue.classList = "mines_value";
  mines.append(minesSlider);
  mines.append(minesValue);
  settingsMenu.append(theme);
  settingsMenu.append(difficulty);
  settingsMenu.append(mines);

  const records = document.createElement("img");
  records.classList = "records";
  if (currentState.theme === "light") {
    records.setAttribute("src", "./list.svg");
  } else {
    records.setAttribute("src", "./list_dark.svg");
  }
  records.setAttribute("alt", "records");

  const recordsList = document.createElement("ol");
  recordsList.classList = "records_list";

  const recordsListTitle = document.createElement("div");
  recordsListTitle.textContent = "Latest records";
  recordsListTitle.classList = "records_title";
  recordsList.append(recordsListTitle);

  top_panel.append(turns);
  top_panel.append(time);
  top_panel.append(reset);
  top_panel.append(settings);
  top_panel.append(settingsMenu);
  top_panel.append(records);

  container.prepend(top_panel);
  container.append(recordsList);
  document.body.prepend(container);
}

function makecanvas(n, m, scale, matrix, colors) {
  if (document.querySelector("canvas")) {
    document.querySelector("canvas").remove("canvas");
  }
  const container = document.querySelector(".container")
  document.body.style.backgroundColor = colors.background;
  const canvas = document.createElement("canvas");

  const paddingLeft = 5;
  const paddingTop = 5;
  let width = 18;
  let height = 18;
  width = width * scale;
  height = height * scale;

  canvas.setAttribute("width", width * m + paddingLeft * 2);
  canvas.setAttribute("height", height * n + paddingTop * 2);

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = colors.cellColors[0];
    ctx.fillRect(
      0,
      0,
      2 * paddingLeft + width * m,
      2 * paddingTop + height * n
    );

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        ctx.fillStyle = colors.cellColors[1];
        ctx.fillRect(
          paddingLeft + width * j,
          paddingTop + height * i,
          width,
          height
        );
        ctx.fillStyle = colors.cellColors[0];
        ctx.fillRect(
          paddingLeft + 2 + width * j,
          paddingTop + 2 + height * i,
          width - 4,
          height - 4
        );
        ctx.beginPath();
        ctx.strokeStyle = colors.cellColors[2];
        ctx.moveTo(paddingLeft + width * (j + 1), paddingTop + height * i);
        ctx.lineTo(paddingLeft + width * j, paddingTop + height * i);
        ctx.lineTo(paddingLeft + width * j, paddingTop + height * (i + 1));
        ctx.lineTo(
          paddingLeft + width * (j + 1),
          paddingTop + height * (i + 1)
        );
        ctx.lineTo(paddingLeft + width * (j + 1), paddingTop + height * i);
        ctx.stroke();
        cellFilling(
          paddingLeft + width * j + width / 4,
          paddingTop + height * i + height / 4,
          width,
          height,
          matrix[i][j],
          ctx,
          colors.numFontColor,
          colors.mineColors,
          colors.flagColors,
          colors.cellColors[1],
          colors.cellColors[0],
          scale
        );
      }
    }
  }
  document.querySelector(".container").append(canvas);
}

function makeFin(x, y, width, height) {
  let region = new Path2D();
  let startingPiontX = x - width / 6;
  let startingPiontY = y - height / 8;
  let scaleX = (width / 300) * 0.8;
  let scaleY = (height / 300) * 0.8;
  region.moveTo(startingPiontX + 60 * scaleX, startingPiontY + 220 * scaleY);
  region.bezierCurveTo(
    startingPiontX + 60 * scaleX,
    startingPiontY + 80 * scaleY,
    startingPiontX + 180 * scaleX,
    startingPiontY + 20 * scaleY,
    startingPiontX + 240 * scaleX,
    startingPiontY + 20 * scaleY
  );
  region.bezierCurveTo(
    startingPiontX + 180 * scaleX,
    startingPiontY + 100 * scaleY,
    startingPiontX + 180 * scaleX,
    startingPiontY + 140 * scaleY,
    startingPiontX + 240 * scaleX,
    startingPiontY + 220 * scaleY
  );
  region.bezierCurveTo(
    startingPiontX + 200 * scaleX,
    startingPiontY + 230 * scaleY,
    startingPiontX + 100 * scaleX,
    startingPiontY + 230 * scaleY,
    startingPiontX + 60 * scaleX,
    startingPiontY + 220 * scaleY
  );
  return region;
}

function cellFilling(
  x,
  y,
  width,
  height,
  num,
  ctx,
  fontColor,
  mineColors,
  flagColors,
  cellBorderColor,
  backgroundColor,
  scale
) {
  if (num === 9) {
    // mine
    let region = makeFin(x, y, width, height);
    ctx.fillStyle = mineColors[0];
    ctx.fill(region, "evenodd");
  } else if (num === 10) {
    // red mine
    ctx.fillStyle = mineColors[1];
    ctx.fillRect(x - width / 4, y - height / 4, width, height);
    let region = makeFin(x, y, width, height);
    ctx.fillStyle = mineColors[0];
    ctx.fill(region, "evenodd");
  } else if (num > 0) {
    // number cell
    ctx.fillStyle = fontColor[num - 1];
    ctx.font = `${15 * scale}px Aria`;
    ctx.fillText(num, x + width / 10, y + height / 2);
  } else if (num === 0) {
    // empty cell
    ctx.fillStyle = cellBorderColor;
    ctx.fillRect(x - width / 4, y - height / 4, width, height);
  } else if (num === -2) {
    // flag cell
    ctx.fillStyle = flagColors[0];
    ctx.beginPath();
    ctx.arc(x + width / 4, y + height / 4, (width - 10) / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.arc(x + width / 4, y + height / 4, (width - 15) / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = flagColors[1];
    ctx.moveTo(x + width / 4 - (width - 10) / 2, y + height / 4);
    ctx.lineTo(x + width / 4 - (width - 15) / 2, y + height / 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + width / 4 + (width - 15) / 2, y + height / 4);
    ctx.lineTo(x + width / 4 + (width - 10) / 2, y + height / 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + width / 4, y + height / 4 + (height - 15) / 2);
    ctx.lineTo(x + width / 4, y + height / 4 + (height - 10) / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + width / 4, y + height / 4 - (height - 10) / 2);
    ctx.lineTo(x + width / 4, y + height / 4 - (height - 15) / 2);
    ctx.stroke();
  } else if (num === -3) {
    // crossed flag
    ctx.fillStyle = flagColors[0];
    ctx.beginPath();
    ctx.arc(x + width / 4, y + height / 4, (width - 10) / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.arc(x + width / 4, y + height / 4, (width - 15) / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = flagColors[1];
    ctx.moveTo(x + width / 4 - (width - 10) / 2, y + height / 4);
    ctx.lineTo(x + width / 4 - (width - 15) / 2, y + height / 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + width / 4 + (width - 15) / 2, y + height / 4);
    ctx.lineTo(x + width / 4 + (width - 10) / 2, y + height / 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + width / 4, y + height / 4 + (height - 15) / 2);
    ctx.lineTo(x + width / 4, y + height / 4 + (height - 10) / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + width / 4, y + height / 4 - (height - 10) / 2);
    ctx.lineTo(x + width / 4, y + height / 4 - (height - 15) / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = flagColors[2];
    ctx.moveTo(x - 1, y + height / 2 + 1);
    ctx.lineTo(x + width / 2 + 1, y - 1);
    ctx.moveTo(x + width / 2 + 1, y + height / 2 + 1);
    ctx.lineTo(x - 1, y - 1);
    ctx.stroke();
  }
}
