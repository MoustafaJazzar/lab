import { random } from './utils'
import drawShape from './shapes'
import { size } from './constants'
class Tile {
    constructor(x, y, c, d, ctx) {
        this.x = x
        this.y = y
        this.d = d
        this.color = c;
        this.ctx = ctx
        this.fg = random(drawShape)
    }

    draw() {
        if (!this.d) {
            this.ctx.beginPath()
            this.ctx.rect(this.x, this.y, size, size);
            this.ctx.fillStyle = this.color
            this.ctx.fill()
            this.ctx.closePath()
        } else {
            this.ctx.beginPath()
            this.fg(this.x, this.y, this.ctx)
            this.ctx.fillStyle = this.color;
            this.ctx.strokeStyle = this.color;
            this.ctx.fill()
            this.ctx.closePath()
        }
    }

    update() {
        this.draw()
    }

    updateFg() {
        this.fg = random(drawShape)
    }
}


export default Tile