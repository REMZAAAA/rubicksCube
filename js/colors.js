const baseColors = [
    "#ffffff",
    "#ffa500",
    "#0000ff",
    "#008000",
    "#ff0000",
    "#ffff00",
]
const colorsEl = document.querySelector(".colors");

export const mapColors = {
    "#ffffff": "W",
    "#ffa500": "O",
    "#0000ff": "B",
    "#008000": "F",
    "#ff0000": "R",
    "#ffff00": "Y"
}
export let colors = initColor();
export let oldColors;
updateColor();

export function initColor(){
    for (let i = 0; i < baseColors.length; i++) {
        colorsEl.querySelector(`input:nth-of-type(${i+1})`).value = baseColors[i];
    }
    return baseColors;
}

export function updateColor(){
    oldColors = Array();
    for (let i = 0; i < colors.length; i++) {
        let tempColor = colors[i];  
        colors[i] = colorsEl.querySelector(`input:nth-of-type(${i+1})`).value;
        oldColors.push({[tempColor]: colors[i]})
        mapColors[colors[i]] = mapColors[tempColor]

        if (!(colors[i] === tempColor)) delete mapColors[tempColor];
    }
}

export function resetColor(){
    colors = initColor();
}
