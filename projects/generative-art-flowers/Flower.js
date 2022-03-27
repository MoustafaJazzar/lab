import { ctx } from "./SetupCanvas.js";
export class Flower {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.3 + 0.2;
        this.maxFlowerSize = this.size + Math.random() * 80;
        this.image = new Image();
        this.image.src = 'https://www.frankslaboratory.co.uk/downloads/flowers.png';
        this.frameSize = 100;
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.size > 11.5 ? this.willFlower = true : this.willFlower = false;
        this.angle = 0
        this.va = Math.random() * 0.05 + 0.025;

        this.grow()
    }

    grow = () => {
        if (this.size < this.maxFlowerSize && this.willFlower) {
            this.size += this.vs;
            this.angle += this.va;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image, this.frameX * this.frameSize, this.frameY * this.frameSize, this.frameSize, this.frameSize, 0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
            ctx.restore()

            requestAnimationFrame(this.grow.bind(this));
        }
    }
}