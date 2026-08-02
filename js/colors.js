import { updateBackground, cubeMap } from "./cubeMap.js";

// Default cube colors.
// Each color is associated with a one-letter abbreviation
// used throughout the rendering of the cube map.
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
        "color": "#ffff00",
        "abbreviatedColor": "Y"
    },
    {
        "color": "#ff0000",
        "abbreviatedColor": "R"
    }
]
const colorsEl = document.querySelector(".colors");

// Initializes the color configuration.
// - Resets all color inputs to their default values.
// - Creates and returns a copy of the default color list.
function initColor(){
    let temp = Array();
    for (let i = 0; i < baseColors.length; i++) {
        // Synchronize the color picker with the default value.
        colorsEl.querySelector(`input:nth-of-type(${i+1})`).value = baseColors[i].color;
        
        // Create a fresh object to avoid modifying baseColors directly.
        temp.push({
            "color": baseColors[i].color,
            "abbreviatedColor": baseColors[i].abbreviatedColor
        });
    }
    return temp
}

export function updateColor(){
    for (let i = 0; i < colors.length; i++) {
        // Read the current value from the corresponding color picker
        // and update the application's color configuration.
        let tempColor = colors[i].color;
        colors[i].color = colorsEl.querySelector(`input:nth-of-type(${i+1})`).value;
    }
    updateBackground(cubeMap, true);
}

export function resetColor(){
    colors = initColor();
    updateBackground(cubeMap, true);
}

export let colors = initColor();