import './styles/style.scss'
import { random } from './scripts/utils'
import { Tile } from './scripts/tile'
import { tileSize, tilePerColumn, tilePerRow, colors } from "./scripts/constants"
import { setupCanvas } from './scripts/setupCanvas'

const canvas = document.querySelector('canvas')
const ctx = setupCanvas(canvas)


const init = () => {
    let bgTiles = []
    let fgTiles = []

    let bgTileColor;
    let fgTileColor;


    for (let i = 0; i < tilePerRow; i++) {
        for (let j = 0; j < tilePerColumn; j++) {
            bgTileColor = random(colors)
            fgTileColor = random(colors.filter(color => color != bgTileColor))

            let tileXPos = i * tileSize;
            let tileYPos = j * tileSize;

            let bgTile = new Tile(tileXPos, tileYPos, bgTileColor, false, ctx)
            let fgTile = new Tile(tileXPos, tileYPos, fgTileColor, true, ctx)

            bgTiles.push(bgTile)
            fgTiles.push(fgTile)
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const tile of bgTiles) tile.update()
    for (const tile of fgTiles) tile.update()
}

init()
document.addEventListener('click', init)