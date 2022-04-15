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

function shuffle(array) {
    var copy = [],
        n = array.length,
        i;

    // While there remain elements to shuffle…
    while (n) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * array.length);

        // If not already shuffled, move it to the new array.
        if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
        }
    }

    return copy;
}
export { random, shuffle };