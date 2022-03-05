function formatValue(value) {
    return value < 10 ? `0${value}` : value;
}

const rangeToPercent = slider => {
    const max = slider.getAttribute('max')
    const percent = slider.value / max * 100

    return `${percent}%`
}

async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand("copy", true, text);
    }
}



export { formatValue, copyTextToClipboard, rangeToPercent };