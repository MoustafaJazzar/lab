function formatValue(value) {
    return value < 10 ? `0${value}` : value;
}

async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand("copy", true, text);
    }
}



export { formatValue, copyTextToClipboard };