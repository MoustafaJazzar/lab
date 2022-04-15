import { ctx } from './setupCanvas.js';
import { Vector } from './vector.js';
import { random } from './utils.js';
import { noise } from './noise.js';


export class Particle {
    constructor(x, y, r, a) {
        this.location = new Vector(x, y);
        this.velocity = new Vector(random(-1, 1), random(-1, 1));
        this.acceleration = new Vector();
        this.alpha = this.pAlpha = a;
        this.amp = 1;
        this.rate = r;

    }

    update(p) {
        this.acceleration.add(new Vector((noise(this.location.x) * 2 - 1), (noise(this.location.y) * 2 - 1)));
        this.velocity.add(this.acceleration);
        this.acceleration.set(0, 0);
        this.location.add(this.velocity);
        this.alpha -= this.rate;

        if (this.alpha <= this.pAlpha * 0.25 && this.pAlpha > 10) {
            p.push(new Particle(this.location.x, this.location.y, this.rate * 0.25, this.pAlpha * 0.5));
        }
    }

    show() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(6, 8, 15, ${this.alpha / 100})`;
        ctx.arc(this.location.x, this.location.y, this.amp, 0, Math.PI * 2, true);
        ctx.fill();
    }

}