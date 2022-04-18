import './style.css'

import { ctx, width, height } from './scripts/setupCanvas.js'
import { random } from './scripts/utils.js'
import {
    margin,
    count,
    BG_COLOR,
    LINE_COLOR,
    palette,
} from './scripts/constants.js'
import { makeTile } from './scripts/tile.js'

document.body.style.backgroundColor = BG_COLOR;

ctx.lineWidth = 2;

let d1 = 0;
let d2 = count / 2;


function draw() {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, width, height);

    if (random() < 1 / 2) {
        [d1, d2] = [d2, d1];
    }

    for (let x = margin + d1; x < width - margin - d1; x += count) {
        for (let y = margin + d1; y < height - margin - d1; y += count) {
            ctx.fillStyle = random(palette);
            makeTile(x, y, count);
            ctx.fill();
        }
    }

    ctx.strokeStyle = LINE_COLOR;
    for (let x = margin + d2; x < width - margin - d2; x += count) {
        for (let y = margin + d2; y < height - margin - d2; y += count) {
            makeTile(x, y, count);
            ctx.stroke();
        }
    }
}


addEventListener('click', () => {
    ctx.clearRect(0, 0, width, height);
    draw();
});
draw()