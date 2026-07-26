import { mapColors } from "./colors.js";

function printLineList(list=null, y=0){
    let m = "";

    if (!list) {
        for (let i = 0; i < 3; i++) {
            m += "  "
        } return m
    }

    for (let i = 0; i < 3; i++) {
        let color = mapColors[list[i+(3 * y)].color];
        m += `${color} `;
    } return m
}

export function renderMap(list) {
    console.log(
        `${printLineList()}${printLineList(list[4], 0)}${printLineList()}`,
        `\n${printLineList()}${printLineList(list[4], 1)}${printLineList()}`,
        `\n${printLineList()}${printLineList(list[4], 2)}${printLineList()}`,
        `\n${printLineList()}${printLineList(list[1], 0)}${printLineList()}`,
        `\n${printLineList()}${printLineList(list[1], 1)}${printLineList()}`,
        `\n${printLineList()}${printLineList(list[1], 2)}${printLineList()}`,
        `\n${printLineList(list[3], 0)}${printLineList(list[0], 0)}${printLineList(list[2], 0)}`,
        `\n${printLineList(list[3], 1)}${printLineList(list[0], 1)}${printLineList(list[2], 1)}`,
        `\n${printLineList(list[3], 2)}${printLineList(list[0], 2)}${printLineList(list[2], 2)}`,
        `\n${printLineList()}${printLineList(list[5], 0)}${printLineList()}`,
        `\n${printLineList()}${printLineList(list[5], 1)}${printLineList()}`,
        `\n${printLineList()}${printLineList(list[5], 2)}${printLineList()}`
    )
}