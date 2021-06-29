const app = document.querySelector<HTMLDivElement>('#app')!;
const canvas = document.createElement('canvas');
const carImage = document.querySelector<HTMLImageElement>('#car1');
app.appendChild(canvas);
const ctx = canvas.getContext('2d');
const Two_Pi = Math.PI * 2;

canvas.width = 800;
canvas.height = 600;

function DrawBackground(color = '#101010') {
  if (!ctx) return;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function DrawRect(x: number, y: number, w: number, h: number, color = '#FFF') {
  if (!ctx) return;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function DrawCircle(x: number, y: number, r: number, color = '#FFF') {
  if (!ctx) return;
  let circle = new Path2D();
  circle.arc(x, y, r, 0, Two_Pi);
  ctx.fillStyle = color;
  ctx.fill(circle);
}

function DrawText(text: string, x: number, y: number, color = '#FFF', font = '10px sanserif') {
  if (!ctx) return;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function DrawCarImage(x: number, y: number, rotation: number = 0) {
  if (!ctx) return;
  DrawCenteredImage(carImage, x, y, rotation);
}

function DrawCenteredImage(img: any, x: number, y: number, rotation: number = 0) {
  if (!ctx) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.restore();
}

export { canvas, DrawBackground, DrawCarImage, DrawCircle, DrawRect, DrawText };
