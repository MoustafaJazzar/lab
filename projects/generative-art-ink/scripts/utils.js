let random = (min, max) => {
    if (max == null) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let floor = (num) => {
    return Math.floor(num);
}

export { random, floor };