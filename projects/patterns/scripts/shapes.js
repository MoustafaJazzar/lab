import { size } from './constants'

let rectTop = (x, y, c) => {
    c.rect(x, y, size, size / 2);
}

let dotTopLeft = (x, y, c) => {
    let _x = x + (size / 5)
    let _y = y + (size / 5)

    c.arc(_x, _y, (size / 10), 0, Math.PI * 2, false);
}

let dotBottomRight = (x, y, c) => {
    let _x = x + (size * .8)
    let _y = y + (size * .8)

    c.arc(_x, _y, (size / 10), 0, Math.PI * 2, false);
}

let dotTopRight = (x, y, c) => {
    let _x = x + (size * .8)
    let _y = y + (size / 5)

    c.arc(_x, _y, (size / 10), 0, Math.PI * 2, false);
}

let dotBottomLeft = (x, y, c) => {
    let _x = x + (size / 5)
    let _y = y + (size * .8)

    c.arc(_x, _y, (size / 10), 0, Math.PI * 2, false);
}

let arcRight = (x, y, c) => {
    let _x = x + (size)
    let _y = y + (size / 2)

    c.arc(_x, _y, (size / 2), 0.5 * Math.PI, 1.5 * Math.PI);
}
let arcLeft = (x, y, c) => {
    let _x = x
    let _y = y + (size / 2)

    c.arc(_x, _y, (size / 2), 1.5 * Math.PI, .5 * Math.PI);
}

let arcBottom = (x, y, c) => {
    let _x = x + (size / 2)
    let _y = y + (size)

    c.arc(_x, _y, (size / 2), Math.PI, 2 * Math.PI);
}

let arcTop = (x, y, c) => {
    let _x = x + (size / 2)
    let _y = y
    c.arc(_x, _y, (size / 2), 2 * Math.PI, Math.PI);
}

let rectLeft = (x, y, c) => {
    c.rect(x, y, size / 2, size);
}
let rectRight = (x, y, c) => {
    c.rect(x + (size / 2), y, size / 2, size);
}
let rectBottom = (x, y, c) => {
    c.rect(x, y + (size / 2), size, size / 2);
}
let frame = (x, y, c) => {
    let lineWidth = (size / 6)
    let startPoint = lineWidth / 2;
    c.lineWidth = lineWidth
    c.strokeRect(x + startPoint, y + startPoint, size - lineWidth, size - lineWidth)
}
let triLeftBottom = (x, y, c) => {
    c.moveTo(x, y);
    c.lineTo(x + size, y + size);
    c.lineTo(x, y + size);
}
let triRightTop = (x, y, c) => {
    c.moveTo(x + size, y);
    c.lineTo(x + size, y + size);
    c.lineTo(x, y);
}
let triLeftTop = (x, y, c) => {
    c.moveTo(x + size, y);
    c.lineTo(x, y);
    c.lineTo(x, y + size);
}
let triRightBottom = (x, y, c) => {
    c.moveTo(x + size, y);
    c.lineTo(x + size, y + size);
    c.lineTo(x, y + size);
}

let triTop = (x, y, c) => {
    c.moveTo(x + (size / 2), y);
    c.lineTo(x + size, y + size);
    c.lineTo(x, y + size);
}
let triLeft = (x, y, c) => {
    c.moveTo(x, y + (size / 2));
    c.lineTo(x + size, y);
    c.lineTo(x + size, y + size);
}
let triBottom = (x, y, c) => {
    c.moveTo(x + (size / 2), y + (size));
    c.lineTo(x + size, y);
    c.lineTo(x, y);
}
let triRight = (x, y, c) => {
    c.moveTo(x + (size), y + (size / 2));
    c.lineTo(x, y);
    c.lineTo(x, y + size);
}

let circleTopLeft = (x, y, c) => {
    c.moveTo(x, y);
    c.arc(x, y, (size), 0, (Math.PI / 2), false);
}
let circleTopRight = (x, y, c) => {
    c.moveTo(x + size, y);
    c.arc(x + size, y, (size), Math.PI / 2, (Math.PI / 2) + (Math.PI / 2), false);
}

let circleBottomRight = (x, y, c) => {
    c.moveTo(x + size, y + size);
    c.arc(x + size, y + size, (size), (Math.PI / 2) * 2, ((Math.PI / 2) * 2) + (Math.PI / 2), false);
}

let circleBottomLeft = (x, y, c) => {
    c.moveTo(x, y + size);
    c.arc(x, y + size, (size), (Math.PI / 2) * 3, ((Math.PI / 2) * 3) + (Math.PI / 2), false);
}

let circleFull = (x, y, c) => {
    c.arc(x + (size / 2), y + (size / 2), (size / 2), 0, Math.PI * 2, false);
}

let drawShape = [
    // triTop,
    dotTopLeft,
    arcTop,
    arcBottom,
    dotBottomLeft,
    arcLeft,
    // triRight,
    rectTop,
    rectRight,
    dotTopRight,
    triRightTop,
    rectLeft,
    rectBottom,
    frame,
    // triBottom,
    circleTopLeft,
    arcRight,
    triLeftTop,
    circleBottomRight,
    triRightBottom,
    circleBottomLeft,
    // triLeft,
    dotBottomRight,
    circleTopRight,
    triLeftBottom,
    circleFull
]


export default drawShape