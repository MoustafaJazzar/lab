const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d')

canvas.style.width = `${innerWidth}px`;
canvas.style.height = `${innerHeight}px`;

const scale = window.devicePixelRatio * 2;
canvas.width = innerWidth * scale;
canvas.height = innerHeight * scale;

ctx.scale(scale, scale);

ctx.lineWidth = 0.4;
export { ctx }