import { ctx, width, height } from './setupCanvas.js'
let margin = 50;
let c = 5;
let count = (width - 2 * margin) / c;
let BG_COLOR = "#fcf7ed";
let LINE_COLOR = "#044e9e";
let palette = ["#6190d3", "#fcd494", "#f4b804", "#D1B3C4", "#457b9d"];

export {
    margin,
    count,
    BG_COLOR,
    LINE_COLOR,
    palette
}