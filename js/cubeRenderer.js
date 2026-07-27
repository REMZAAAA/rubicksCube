import { colors } from "./colors.js";

function getLineColor(list=null, y=0){
    let m = "";
    for (let i = 0; i < 3; i++) {
        let abbreviatedColor = list ? colors[list[i+(3 * y)].faceId].abbreviatedColor : "|";
        m += `${abbreviatedColor} `;
    } return m
}

export function renderMap(list) {
    console.log(
        `${getLineColor()}${getLineColor(list[4], 0)}${getLineColor()}`,
        `\n${getLineColor()}${getLineColor(list[4], 1)}${getLineColor()}`,
        `\n${getLineColor()}${getLineColor(list[4], 2)}${getLineColor()}`,
        `\n${getLineColor()}${getLineColor(list[1], 0)}${getLineColor()}`,
        `\n${getLineColor()}${getLineColor(list[1], 1)}${getLineColor()}`,
        `\n${getLineColor()}${getLineColor(list[1], 2)}${getLineColor()}`,
        `\n${getLineColor(list[3], 0)}${getLineColor(list[0], 0)}${getLineColor(list[2], 0)}`,
        `\n${getLineColor(list[3], 1)}${getLineColor(list[0], 1)}${getLineColor(list[2], 1)}`,
        `\n${getLineColor(list[3], 2)}${getLineColor(list[0], 2)}${getLineColor(list[2], 2)}`,
        `\n${getLineColor()}${getLineColor(list[5], 0)}${getLineColor()}`,
        `\n${getLineColor()}${getLineColor(list[5], 1)}${getLineColor()}`,
        `\n${getLineColor()}${getLineColor(list[5], 2)}${getLineColor()}`
    )
}