export class Vector {
    constructor(x, y) {
            // if no x and y are passed in, create a vector with x and y of 0
            if (!x || !y) {
                x = 0;
                y = 0;
            }
            this.x = x;
            this.y = y;

        }
        // vector.set sets the x and y of the vector
    set(x, y) {
            this.x = x;
            this.y = y;
        }
        // vector.add adds the x and y of the vector to the current x and y
    add(vector) {
            this.x += vector.x;
            this.y += vector.y;
        }
        // vector.sub subtracts the x and y of the vector from the current x and y
    sub(vector) {
            this.x -= vector.x;
            this.y -= vector.y;
        }
        // vector.multiply multiplies the x and y of the vector by the current x and y
    multiply(vector) {
            this.x *= vector.x;
            this.y *= vector.y;
        }
        // vector.divide divides the x and y of the vector by the current x and y
    divide(vector) {
            this.x /= vector.x;
            this.y /= vector.y;
        }
        // vector.mag returns the magnitude of the vector
    mag() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        // vector.normalize normalizes the vector
    normalize() {
            let mag = this.mag();
            if (mag != 0) {
                this.divide(mag);
            }
        }
        // vector.limit limits the magnitude of the vector
    limit(max) {
            if (this.mag() > max) {
                this.normalize();
                this.multiply(max);
            }
        }
        // vector.setMag sets the magnitude of the vector
    setMag(mag) {
            this.multiply(mag);
        }
        // vector.heading returns the angle of the vector
    heading() {
            return Math.atan2(this.y, this.x);
        }
        // vector.rotate rotates the vector by the angle
    rotate(angle) {
            let mag = this.mag();
            this.x = Math.cos(angle) * mag;
            this.y = Math.sin(angle) * mag;
        }
        // vector.lerp sets the vector to a linear interpolation between the vector and the target vector
    lerp(vector, amt) {
            this.x += (vector.x - this.x) * amt;
            this.y += (vector.y - this.y) * amt;
        }
        // vector.dist returns the distance between the vector and the target vector
    dist(vector) {
            let dx = vector.x - this.x;
            let dy = vector.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        // vector.copy copies the vector
    copy() {
        return new Vector(this.x, this.y);
    }
}