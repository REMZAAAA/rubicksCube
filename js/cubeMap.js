import { layers } from "./layerHandler.js"

const faceAxis = {
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

export const cubeMap = initMap();
const defaultMap = initMap();
matchBackground()

export function resetMap(){
    for (let i = 0; i < cubeMap.length; i++) {
        cubeMap[i] = defaultMap[i];
    }
}

function initMap(){
    const tempMap = Array();
    for (let i = 0; i < 6; i++) {
        tempMap.push(Array.from({ length: 9 }, () => ({"cube": null, "pos": null, "index": null})));      
    }for (let i = 0; i < 9; i++) {
        tempMap[0][i]["color"] = "White";
        tempMap[1][i]["color"] = "Orange";
        tempMap[2][i]["color"] = "Blue";
        tempMap[3][i]["color"] = "Green";
        tempMap[4][i]["color"] = "Yellow";
        tempMap[5][i]["color"] = "Red";
    }
    fillData(tempMap)
    return tempMap
}

function fillData(map){
    for (let i = 0; i < 6; i++) {
        for (let y = 0; y < 9; y++) {
            map[i][y]["cube"]  = parseInt(faceData[i].cube[y].slice(1));
            map[i][y]["pos"]   = faceData[i].pos;      
            map[i][y]["index"] = faceData[i].index;      
            map[i][y]["obj"] = document.querySelector(`#c${map[i][y].cube} .face:nth-child(${faceAxis[map[i][y].pos][map[i][y].index]})`);      
        }
    }
}

export function matchBackground(){
    for (let i = 0; i < cubeMap.length; i++) {
        cubeMap[i].forEach(el => {
            el.obj.style.backgroundColor = el.color;
        });
    }
}

