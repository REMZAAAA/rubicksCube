import { layers } from "./layerHandler.js"
import { colors } from "./colors.js";

const faceAxis = {
    // Each cube in the rubick's cube (27) have 6 faces and face the same direction.
    // We want to be able to color face individually,
    // for each axis you have the "front" and "back".
    "x": [5, 6],
    "y": [3, 4],
    "z": [1, 2]
}

const faceData = [
    {
        cube: layers[0].grid,
        pos: "z",
        index: 1,
    },
    {
        cube: layers[4].grid,
        pos: "y",
        index: 0,
    },
    {
        cube: layers[3].grid,
        pos: "x",
        index: 1,
    },
    {
        cube: layers[2].grid,
        pos: "x",
        index: 0,
    },
    {
        cube: layers[1].grid,
        pos: "z",
        index: 0,
    },
    {
        cube: layers[5].grid,
        pos: "y",
        index: 1,
    },
]

export let cubeMap = initMap();
console.log(cubeMap)

export function resetMap(){
    cubeMap = initMap();
}

function initMap(){
    const tempMap = Array();
    for (let i = 0; i < 6; i++) { // Create the 6 faces.
        tempMap.push(Array.from({ length: 9 }, () => ({
            "color": colors[i],
            "faceId": i
        })));      
    }
    fillData(tempMap)
    matchBackground(tempMap)
    return tempMap
}

function fillData(map){
    // After the map is created, we still need to add some
    // data to each square:
    // - wich cube he is in
    // - wich axis he face
    // - is it the front or the back one ?
    // - and finally the object.
    for (let i = 0; i < 6; i++) {
        for (let y = 0; y < 9; y++) {
            map[i][y]["cube"]  = parseInt(faceData[i].cube[y].slice(1));
            map[i][y]["pos"]   = faceData[i].pos;      
            map[i][y]["index"] = faceData[i].index;      
            map[i][y]["obj"] = document.querySelector(`#c${map[i][y].cube} .face:nth-child(${faceAxis[map[i][y].pos][map[i][y].index]})`);      
        }
    }
}

export function matchBackground(map){
    for (let i = 0; i < 6; i++) {
        for (let y = 0; y < 9; y++) {
            map[i][y].color = colors[map[i][y].faceId].color
            map[i][y].obj.style.backgroundColor = map[i][y].color
        }
    }
}

