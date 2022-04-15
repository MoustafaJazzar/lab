export const setupCanvas = () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");


    const width = innerWidth;
    const height = innerHeight;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const scale = window.devicePixelRatio * 2;
    canvas.width = width * scale;
    canvas.height = height * scale;

    ctx.scale(scale, scale);

    return { ctx, canvas, width, height };
}

const c = setupCanvas();

export const { ctx, canvas, width, height } = c