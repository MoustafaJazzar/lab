import './style.css'
import { ctx, width, height } from './scripts/setupCanvas.js';
import { random, map } from './scripts/utils.js';
import { Particle } from './scripts/particle';
import { number_of_particles } from './scripts/constants'

var particles_a = [];
var particles_b = [];
var particles_c = [];


ctx.fillStyle = "rgb(21, 8, 50)";
ctx.fillRect(0, 0, width, height);


for (var i = 0; i < number_of_particles; i++) {
    particles_a[i] = new Particle(random(0, width), random(0, height));
    particles_b[i] = new Particle(random(0, width), random(0, height));
    particles_c[i] = new Particle(random(0, width), random(0, height));
}

function draw() {
    for (var i = 0; i < number_of_particles; i++) {
        var radius = map(i, 0, number_of_particles, .5, 1);
        var alpha = map(i, 0, number_of_particles, 0, 1);

        ctx.fillStyle = `rgba(69, 33, 124, ${alpha})`;
        particles_a[i].move();
        particles_a[i].display(radius);
        particles_a[i].checkEdge();

        ctx.fillStyle = `rgba(7, 153, 242, ${alpha})`;
        particles_b[i].move();
        particles_b[i].display(radius);
        particles_b[i].checkEdge();

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        particles_c[i].move();
        particles_c[i].display(radius);
        particles_c[i].checkEdge();
    }
    requestAnimationFrame(draw);
}


draw()