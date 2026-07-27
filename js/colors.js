import { matchBackground, cubeMap } from "./cubeMap.js";

const baseColors = [
    {
        "color": "#ffffff",
        "abbreviatedColor": "W"
    },
    {
        "color": "#ffa500",
        "abbreviatedColor": "O"
    },
    {
        "color": "#0000ff",
        "abbreviatedColor": "B"
    },
    {
        "color": "#008000",
        "abbreviatedColor": "G"
    },
    {
        "color": "#ff0000",
        "abbreviatedColor": "R"
    },
    {
        "color": "#ffff00",
        "abbreviatedColor": "Y"
    }
]
const colorsEl = document.querySelector(".colors");

function initColor(){
    let temp = Array();
    for (let i = 0; i < baseColors.length; i++) {
        colorsEl.querySelector(`input:nth-of-type(${i+1})`).value = baseColors[i].color;
        temp.push({
            "color": baseColors[i].color,
            "abbreviatedColor": baseColors[i].abbreviatedColor
        });
    }
    return temp
}

export function updateColor(){
    for (let i = 0; i < colors.length; i++) {
        let tempColor = colors[i].color;
        colors[i].color = colorsEl.querySelector(`input:nth-of-type(${i+1})`).value;
    }
    matchBackground(cubeMap);
}

export function resetColor(){
    colors = initColor();
    matchBackground(cubeMap);
}

export let colors = initColor();