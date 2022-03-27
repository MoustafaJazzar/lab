import { Root } from './Root'

let drowning = false;
let iter = Math.max(innerWidth, innerHeight) / 10;

addEventListener('mousemove', (e) => {
    if (drowning) {
        for (let i = 0; i < 3; i++) new Root(e.x, e.y)
    }
})
addEventListener('mousedown', (e) => {
    drowning = true;
    for (let i = 0; i < 30; i++) new Root(e.x, e.y)

})
addEventListener('mouseup', (e) => {
    drowning = false;
})

setInterval(e => {
    if (iter > 0) {
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * innerWidth;
            const y = Math.random() * innerHeight
            new Root(x, y)
        }
        iter--;
    }
}, 90)