export default function makecanvas(n, m, matrix) {
  const canvas = document.createElement("canvas");

  const paddingLeft = 10;
  const paddingTop = 10;
  const width = 24;
  const height = 24;

  canvas.setAttribute('width', width*m + paddingLeft*2);
  canvas.setAttribute('height', height*n + paddingTop*2);

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#d6e8fd";
    ctx.fillRect(0, 0, 300, 300);

  for (let i = 0; i < n; i++){
      for (let j = 0; j < m; j++){
        ctx.fillStyle = "#0a7cf5";
        ctx.fillRect(paddingLeft + (width)*j, paddingTop + (height)*i, width, height);
        ctx.fillStyle = "#d6e8fd";
        ctx.fillRect(paddingLeft+2 + (width)*j, paddingTop+2 + (height)*i, width-4, height-4);
        ctx.beginPath();
        ctx.strokeStyle = "#ebf206";
        ctx.moveTo(paddingLeft + (width)*(j+1), paddingTop + (height)*i);
        ctx.lineTo(paddingLeft + (width)*j, paddingTop + (height)*i);
        ctx.lineTo(paddingLeft + (width)*j, paddingTop + (height)*(i+1));
        ctx.stroke();
        //console.log(matrix[i][j]);
        cellFilling(paddingLeft + (width)*j + width/4, paddingTop + (height)*(i) + height/4, width, height, matrix[i][j], ctx)
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

function cellFilling(x, y, width, height, num, ctx) {
  if (num === 9) {
    let region = makeFin(x, y, width, height);
    ctx.fillStyle = " #6C7780";
    ctx.fill(region, "evenodd");
  }
}
