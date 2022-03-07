import './styles/style.scss'
import { random } from './scripts/utils'
import Tile from './scripts/tile'
import { size, tilePerColumn, tilePerRow } from "./scripts/constants"

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = size * tilePerRow
canvas.height = size * tilePerColumn

let colors = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];


// Implementation
let tiles
let fg

function init() {
    tiles = []
    fg = []

    let tileColor;
    let fgColor;


    for (let i = 0; i < tilePerRow; i++) {
        for (let j = 0; j < tilePerColumn; j++) {
            tileColor = random(colors)
            let t = new Tile(i * size, j * size, tileColor, false, ctx)
            tiles.push(t)
            fgColor = random(colors.filter(s => s != tileColor))
            let t2 = new Tile(i * size, j * size, fgColor, true, ctx)
            fg.push(t2)
        }
    }

}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    tiles.forEach(object => {
        object.update()
    })
    fg.forEach(object => {
        object.update()
    })
}

init()
animate()

document.addEventListener('click', init)