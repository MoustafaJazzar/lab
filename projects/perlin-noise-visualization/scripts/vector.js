export class Vector {
    constructor(x, y) {
        if (!x || !y) {
            x = 0;
            y = 0;
        }
        this.x = x;
        this.y = y;

    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }
    multiply(vector) {
        if (typeof vector === 'number') {
            this.x *= vector;
            this.y *= vector;
        } else {

            this.x *= vector.x;
            this.y *= vector.y;
        }
    }
    divide(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
    }
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        let mag = this.mag();
        if (mag != 0) {
            this.divide(mag);
        }
    }
    limit(max) {
        if (this.mag() > max) {
            this.normalize();
            this.multiply(max);
        }
    }
    setMag(mag) {
        this.multiply(mag);
    }
    heading() {
        return Math.atan2(this.y, this.x);
    }
    rotate(angle) {
        let mag = this.mag();
        this.x = Math.cos(angle) * mag;
        this.y = Math.sin(angle) * mag;
    }
    lerp(vector, amt) {
        this.x += (vector.x - this.x) * amt;
        this.y += (vector.y - this.y) * amt;
    }
    dist(vector) {
        let dx = vector.x - this.x;
        let dy = vector.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    copy() {
        return new Vector(this.x, this.y);
    }
}