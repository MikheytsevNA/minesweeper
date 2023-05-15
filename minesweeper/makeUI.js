export { makecanvas, makeUI };

function makeUI() {
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

  time.append(timeText);
  time.append(timeCount);

  const reset = document.createElement("img");
  reset.classList = "reset";
  reset.setAttribute("src", "./reset.svg");
  reset.setAttribute("alt", "reset");

  const settings = document.createElement("img");
  settings.classList = "settings";
  settings.setAttribute("src", "./settings.svg");
  settings.setAttribute("alt", "settings");

  const settingsMenu = document.createElement("div");
  settingsMenu.classList = "settings_menu";
  const theme = document.createElement("div");
  const difficulty = document.createElement("div");
  const mines = document.createElement("div");

  const records = document.createElement("img");
  records.classList = "records";
  records.setAttribute("src", "./list.svg");
  records.setAttribute("alt", "records");

  const recordsList = document.createElement("ol");
  recordsList.classList = "records_list";

  const recordsListTitle = document.createElement("div")
  recordsListTitle.textContent = "Latest records";
  recordsListTitle.classList = "records_title"
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

function makecanvas(n, m, matrix) {
  if (document.querySelector("canvas")) {
    document.querySelector("canvas").remove("canvas");
  }
  const canvas = document.createElement("canvas");

  const paddingLeft = 5;
  const paddingTop = 5;
  let width = 18;
  let height = 18;
  const scale = 1.5;
  width = width * scale;
  height = height * scale;
  const fontColor = [
    "#2d0b02",
    "#f6993f",
    "#5e4f02",
    "#38c172",
    "#4dc0b5",
    "#3490dc",
    "#6574cd",
    "#9561e2",
  ];
  const backgroundColor = "#f2f8fe";
  const cellBorderColor = "#0a7cf5";
  const hightlightColor = "#ebf206";

  canvas.setAttribute("width", width * m + paddingLeft * 2);
  canvas.setAttribute("height", height * n + paddingTop * 2);

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, 300, 300);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        ctx.fillStyle = cellBorderColor;
        ctx.fillRect(
          paddingLeft + width * j,
          paddingTop + height * i,
          width,
          height
        );
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(
          paddingLeft + 2 + width * j,
          paddingTop + 2 + height * i,
          width - 4,
          height - 4
        );
        ctx.beginPath();
        ctx.strokeStyle = hightlightColor;
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
          fontColor,
          cellBorderColor,
          backgroundColor,
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
  cellBorderColor,
  backgroundColor,
  scale
) {
  if (num === 9) {
    // mine
    let region = makeFin(x, y, width, height);
    ctx.fillStyle = "#6C7780";
    ctx.fill(region, "evenodd");
  } else if (num === 10) {
    // red mine
    ctx.fillStyle = "#ff111f";
    ctx.fillRect(x - width / 4, y - height / 4, width, height);
    let region = makeFin(x, y, width, height);
    ctx.fillStyle = "#6C7780";
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
    ctx.fillStyle = "#ef5f10";
    ctx.beginPath();
    ctx.arc(x + width / 4, y + height / 4, (width - 10) / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.arc(x + width / 4, y + height / 4, (width - 15) / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
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
    ctx.fillStyle = "#ef5f10";
    ctx.beginPath();
    ctx.arc(x + width / 4, y + height / 4, (width - 10) / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.arc(x + width / 4, y + height / 4, (width - 15) / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#ff111f";
    ctx.moveTo(x - 1, y + height / 2 + 1);
    ctx.lineTo(x + width / 2 + 1, y - 1);
    ctx.moveTo(x + width / 2 + 1, y + height / 2 + 1);
    ctx.lineTo(x - 1, y - 1);
    ctx.stroke();
  }
}
