import { ctx } from './setupCanvas.js'
import { random } from './utils.js'

export function makeTile(x, y, count) {
    ctx.beginPath();
    ctx.lineTo(x + count / 2, y);
    if (random() < 1 / 2) { ctx.lineTo(x + count, y); }
    ctx.lineTo(x + count, y + count / 2);
    if (random() < 1 / 2) { ctx.lineTo(x + count, y + count); }
    ctx.lineTo(x + count / 2, y + count);
    if (random() < 1 / 2) { ctx.lineTo(x, y + count); }
    ctx.lineTo(x, y + count / 2);
    if (random() < 1 / 2) { ctx.lineTo(x, y); }
    ctx.closePath();
}