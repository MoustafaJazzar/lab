import { Vector } from './vector.js';
import { ctx, width, height } from './setupCanvas.js';
import { cos, sin, random, TWO_PI } from './utils.js';
import { noise } from './noise'
import { noiseScale } from './constants.js';

export class Particle {
    constructor(x, y) {
        this.dir = new Vector(0, 0);
        this.vel = new Vector(0, 0);
        this.pos = new Vector(x, y);
        this.speed = 0.4;

    }
    move() {
        var angle = noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * (TWO_PI) * noiseScale;
        this.dir.x = cos(angle);
        this.dir.y = sin(angle);
        this.vel = this.dir.copy();
        this.vel.multiply(this.speed);
        this.pos.add(this.vel);
    };

    checkEdge() {
        if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
            this.pos.x = random(50, width);
            this.pos.y = random(50, height);
        }
    };

    display(radius) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, radius, 0, TWO_PI);
        ctx.fill();
    };
}