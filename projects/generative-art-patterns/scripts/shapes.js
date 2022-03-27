import { tileSize } from './constants'

const PI = Math.PI;
const PI2 = PI * 2;
const PI05 = PI * 0.5
const PI103 = PI * 1.5

const rectTop = (x, y, ctx) => {
    ctx.rect(x, y, tileSize, tileSize / 2);
}

const dotTopLeft = (x, y, ctx) => {
    const _x = x + (tileSize / 5)
    const _y = y + (tileSize / 5)

    ctx.arc(_x, _y, (tileSize / 10), 0, PI2, false);
}

const dotBottomRight = (x, y, ctx) => {
    const _x = x + (tileSize * .8)
    const _y = y + (tileSize * .8)

    ctx.arc(_x, _y, (tileSize / 10), 0, PI2, false);
}

const dotTopRight = (x, y, ctx) => {
    const _x = x + (tileSize * .8)
    const _y = y + (tileSize / 5)

    ctx.arc(_x, _y, (tileSize / 10), 0, PI2, false);
}

const dotBottomLeft = (x, y, ctx) => {
    const _x = x + (tileSize / 5)
    const _y = y + (tileSize * .8)

    ctx.arc(_x, _y, (tileSize / 10), 0, PI2, false);
}

const arcRight = (x, y, ctx) => {
    const _x = x + (tileSize)
    const _y = y + (tileSize / 2)

    ctx.arc(_x, _y, (tileSize / 2), PI05, PI103);
}
const arcLeft = (x, y, ctx) => {
    const _x = x
    const _y = y + (tileSize / 2)

    ctx.arc(_x, _y, (tileSize / 2), PI103, PI05);
}

const arcBottom = (x, y, ctx) => {
    const _x = x + (tileSize / 2)
    const _y = y + (tileSize)

    ctx.arc(_x, _y, (tileSize / 2), PI, PI2);
}

const arcTop = (x, y, ctx) => {
    const _x = x + (tileSize / 2)
    const _y = y
    ctx.arc(_x, _y, (tileSize / 2), PI2, PI);
}

const rectLeft = (x, y, ctx) => {
    ctx.rect(x, y, tileSize / 2, tileSize);
}
const rectRight = (x, y, ctx) => {
    ctx.rect(x + (tileSize / 2), y, tileSize / 2, tileSize);
}
const rectBottom = (x, y, ctx) => {
    ctx.rect(x, y + (tileSize / 2), tileSize, tileSize / 2);
}
const frame = (x, y, ctx) => {
    const startPoint = (tileSize * .15)
    const _size = tileSize - (tileSize * .30)
    ctx.rect(x + startPoint, y + startPoint, _size, _size);
}
const triBottomLeft = (x, y, ctx) => {
    ctx.moveTo(x, y);
    ctx.lineTo(x + tileSize, y + tileSize);
    ctx.lineTo(x, y + tileSize);
}
const triTopRight = (x, y, ctx) => {
    ctx.moveTo(x + tileSize, y);
    ctx.lineTo(x + tileSize, y + tileSize);
    ctx.lineTo(x, y);
}
const triTopLeft = (x, y, ctx) => {
    ctx.moveTo(x + tileSize, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + tileSize);
}
const triBottomRight = (x, y, ctx) => {
    ctx.moveTo(x + tileSize, y);
    ctx.lineTo(x + tileSize, y + tileSize);
    ctx.lineTo(x, y + tileSize);
}

const triTop = (x, y, ctx) => {
    ctx.moveTo(x + (tileSize / 2), y);
    ctx.lineTo(x + tileSize, y + tileSize);
    ctx.lineTo(x, y + tileSize);
}
const triLeft = (x, y, ctx) => {
    ctx.moveTo(x, y + (tileSize / 2));
    ctx.lineTo(x + tileSize, y);
    ctx.lineTo(x + tileSize, y + tileSize);
}
const triBottom = (x, y, ctx) => {
    ctx.moveTo(x + (tileSize / 2), y + (tileSize));
    ctx.lineTo(x + tileSize, y);
    ctx.lineTo(x, y);
}

const triRight = (x, y, ctx) => {
    ctx.moveTo(x + (tileSize), y + (tileSize / 2));
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + tileSize);
}

const circleTopLeft = (x, y, ctx) => {
    ctx.moveTo(x, y);
    ctx.arc(x, y, (tileSize), 0, PI05, false);
}
const circleTopRight = (x, y, ctx) => {
    ctx.moveTo(x + tileSize, y);
    ctx.arc(x + tileSize, y, (tileSize), PI05, PI, false);
}

const circleBottomRight = (x, y, ctx) => {
    ctx.moveTo(x + tileSize, y + tileSize);
    ctx.arc(x + tileSize, y + tileSize, tileSize, PI, PI + PI05, false);
}

const circleBottomLeft = (x, y, ctx) => {
    ctx.moveTo(x, y + tileSize);
    ctx.arc(x, y + tileSize, tileSize, PI103, PI103 + PI05, false);
}

const circleFull = (x, y, ctx) => {
    ctx.arc(x + tileSize / 2, y + tileSize / 2, tileSize / 2, 0, PI2, false);
}

const dotShapes = [
    dotTopLeft,
    dotTopRight,
    dotBottomLeft,
    dotBottomRight
]
const triShapes = [
    triTopLeft,
    triTopRight,
    triBottomLeft,
    triBottomRight
]
const tri2Shapes = [
    triTop,
    triBottom,
    triRight,
    triLeft
]
const circleShapes = [
    circleTopLeft,
    circleTopRight,
    circleBottomLeft,
    circleBottomRight,
    circleFull
]
const arcShapes = [
    arcTop,
    arcBottom,
    arcRight,
    arcLeft
]
const rectShapes = [
    rectTop,
    rectBottom,
    rectRight,
    rectLeft,
    frame
]

export const drawShape = [
    ...dotShapes,
    ...triShapes,
    ...circleShapes,
    ...arcShapes,
    ...rectShapes,
    // ...tri2Shapes,
]