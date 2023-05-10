
export default function makecanvas(n,m) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', 300);
  canvas.setAttribute('height', 300);

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
  document.body.append(canvas);
}