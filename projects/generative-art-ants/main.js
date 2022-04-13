import './style.css';
import { noise } from './noise.js';
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d')

canvas.style.width = `${innerWidth}px`;
canvas.style.height = `${innerHeight}px`;

const scale = window.devicePixelRatio * 2;

const canvasWidth = innerWidth * scale;
const canvasHeight = innerHeight * scale;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

ctx.scale(scale, scale);

let random = function(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let list_of_ants = [];
let number_of_ants = random(6000, 10000);
let tick = 0;

console.log(`${number_of_ants} ants created`);

class Ant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = random(1, 2);

        this.hue = random(120, 270);
        this.alpha = 0.01;
    }

    move() {
        this.x += 5 * (0.5 - noise(this.x / 100, this.y / 40));
        this.y += 5 * (0.5 - noise(this.y / 100, this.x / 20));
        this.alpha = Math.tanh(tick / 1000);
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${this.hue}, 80%, 80%, ${this.alpha})`;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }

}


const addAnt = (x, y) => {
    if (!x || !y) {
        x = random(0, canvasWidth);
        y = random(0, canvasHeight);
    }
    list_of_ants.push(new Ant(x, y));
}


function setup() {
    for (let i = 0; i < number_of_ants; i++) addAnt()

    addEventListener("click", e => {
        addAnt(e.clientX, e.clientY);
    })

}


function loop() {
    for (const a of list_of_ants) {
        a.draw();
        a.move();
    }


    tick += 1;
    addAnt()
    requestAnimationFrame(loop);
}


setup();
loop()