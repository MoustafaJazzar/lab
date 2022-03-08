import { random } from './utils'
import { drawShape } from './shapes'
import { tileSize } from './constants'
export class Tile {
    constructor(xPos, yPos, tileColor, isFgTile, ctx) {
        this.x = xPos
        this.y = yPos
        this.isFgTile = isFgTile
        this.color = tileColor;
        this.ctx = ctx
        this.fg = random(drawShape)
    }

    draw() {
        if (!this.isFgTile) {
            this.ctx.beginPath()
            this.ctx.rect(this.x, this.y, tileSize, tileSize);
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