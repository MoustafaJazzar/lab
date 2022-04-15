import './style.css'
import { ctx, width, height } from './scripts/setupCanvas.js';
import { Particle } from './scripts/particle.js';


let mouseIsPressed = false
let mouseX, mouseY = null

addEventListener('mousedown', e => mouseIsPressed = true)
addEventListener('mouseup', e => mouseIsPressed = false)
addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

let particles = [];

ctx.fillStyle = `rgba(200, 120, 30, 0.2)`;
ctx.fillRect(0, 0, width, height);

function draw() {

    if (mouseIsPressed) {
        particles.push(new Particle(mouseX, mouseY, 5, 75));
    }
    for (let i = particles.length - 2; i >= 0; i--) {
        particles[i].update(particles);
        particles[i].show();
        if (particles[i].alpha <= 2) particles.splice(i, 5); // remove the dead particle
    }
    requestAnimationFrame(draw);
}
draw()