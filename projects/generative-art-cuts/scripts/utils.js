let random = function(min, max) {
    if (arguments.length == 1 && Array.isArray(min)) {
        return min[Math.floor(Math.random() * min.length)];
    }
    if (!max && !min) {
        return Math.random();
    }
    if (max == null) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let map = function(value, iStart, iStop, oStart, oStop) {
    return oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart));
}

let sin = Math.sin;
let cos = Math.cos;
let TWO_PI = Math.PI * 2;

export { random, map, cos, sin, TWO_PI }