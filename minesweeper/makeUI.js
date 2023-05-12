export {makecanvas, makeUI}

function makeUI() {
  const container = document.createElement("div");
  container.classList = "container";
  const turnsCount = document.createElement("div");
  turnsCount.textContent = "0";
  turnsCount.classList = "turns";
  const timeCount = document.createElement("div");
  timeCount.textContent = "0";
  timeCount.classList = "time";
  const reset = document.createElement("img");
  reset.classList = "reset";
  reset.setAttribute("src", './reset.svg');
  reset.setAttribute("alt", 'reset');
  const settings = document.createElement("img");
  settings.classList = "settings";
  settings.setAttribute("src", './settings.svg');
  settings.setAttribute("alt", 'settings');

  container.append(turnsCount);
  container.append(timeCount);
  container.append(reset);
  container.append(settings);

  document.body.prepend(container);
}

function makecanvas(n, m, matrix) {
  if (document.querySelector("canvas")) {
    document.querySelector("canvas").remove("canvas");
  }
  const canvas = document.createElement("canvas");

  const paddingLeft = 10;
  const paddingTop = 10;
  const width = 24;
  const height = 24;
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
          backgroundColor
        );
      }
    }
  }
  document.body.append(canvas);
}

function makeFin(x, y, width, height) {
  let region = new Path2D();
  //region.strokeStyle = "#ebf206";
  region.moveTo(x + 60 / width, y + 220 / height);
  region.bezierCurveTo(
    x + 60 / width,
    y + 80 / height,
    x + 180 / width,
    y + 20 / height,
    x + 240 / width,
    y + 20 / height
  );
  region.bezierCurveTo(
    x + 180 / width,
    y + 100 / height,
    x + 180 / width,
    y + 140 / height,
    x + 240 / width,
    y + 220 / height
  );
  region.bezierCurveTo(
    x + 200 / width,
    y + 230 / height,
    x + 100 / width,
    y + 230 / height,
    x + 60 / width,
    y + 220 / height
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
  backgroundColor
) {
  if (num === 9) { // mine
    let region = makeFin(
      x - width / 6,
      y - height / 10,
      width / 1.5,
      height / 1.5
    );
    ctx.fillStyle = "#6C7780";
    ctx.fill(region, "evenodd");
  } else if (num === 10) { // red mine
    ctx.fillStyle = "#ff111f";
    ctx.fillRect(x - width / 4, y - height / 4, width, height);
    let region = makeFin(
      x - width / 6,
      y - height / 10,
      width / 1.5,
      height / 1.5
    );
    ctx.fillStyle = "#6C7780";
    ctx.fill(region, "evenodd");
  } else if (num > 0) { // number cell
    ctx.fillStyle = fontColor[num - 1];
    ctx.font = "15px Aria";
    ctx.fillText(num, x + width / 9, y + height / 2);
  } else if (num === 0) { // empty cell
    ctx.fillStyle = cellBorderColor;
    ctx.fillRect(x - width / 4, y - height / 4, width, height);
  } else if (num === -2) { // flag cell
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
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(x + width / 4, y + height / 4 - (height - 10) / 2);
    ctx.lineTo(x + width / 4, y + height / 4 - (height - 15) / 2);
    ctx.stroke()
  } else if (num === -3) { // crossed flag
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
