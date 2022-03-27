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
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        if (!this.isFgTile) {
            this.ctx.rect(this.x, this.y, tileSize, tileSize);
            this.ctx.fill()
        } else {
            this.fg(this.x, this.y, this.ctx)
            this.ctx.fill()
        }
        this.ctx.closePath()
    }
}