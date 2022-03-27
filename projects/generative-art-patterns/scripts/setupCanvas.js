import { tileSize, tilePerRow, tilePerColumn } from "./constants"
export const setupCanvas = (canvas) => {
    const ctx = canvas.getContext('2d')

    const canvasWidth = tileSize * tilePerRow
    const canvasHeight = tileSize * tilePerColumn

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    const scale = window.devicePixelRatio * 5;
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;

    ctx.scale(scale, scale);

    return ctx
}