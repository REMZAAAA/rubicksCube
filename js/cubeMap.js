import { layers } from "./layerHandler.js"
import { colors } from "./colors.js";

const faceAxis = {
    // Each cube has 6 faces, always oriented
    // along the same three axes.
    // For each axis, we store the corresponding
    // front and back face indices in the DOM.
    "x": [5, 6],
    "y": [3, 4],
    "z": [1, 2]
}

const faceData = [
    // Describes the six visible faces of the cube:
    // - the cube that belong to the face,
    // - the axis the face is aligned with,
    // - whether it is the front (0) or back (1)
    //   side of that axis.
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

export function resetMap(){
    cubeMap = initMap();
}

function initMap(){
    const tempMap = Array();

    // Create the six cube faces.
    // Each face contains nine stickers.
    for (let i = 0; i < 6; i++) {
        tempMap.push(Array.from({ length: 9 }, () => ({
            "color": colors[i],
            "faceId": i
        })));      
    }

    fillMap(tempMap)
    updateBackground(tempMap)
    return tempMap
}

function fillMap(map){
    // Each sticker needs additional metadata:
    // - its piece type (corner, edge, center),
    // - the cube it belongs to,
    // - the axis it faces,
    // - whether it is on the front or back side,
    // - the corresponding DOM element.
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 9; j++) {
            // Face layout:
            // 1 2 3
            // 4 5 6
            // 7 8 9
            //
            // Even positions are edges,
            // position 5 is the center,
            // the remaining positions are corners.
            map[i][j]["piece"] = (j+1)%2 == 0 ? "edge" : (j+1) != 5 ? "corner" : "center";
            
            // Extract the cube number from identifiers
            // such as "c1", "c14", etc.
            map[i][j]["cube"]  = parseInt(faceData[i].cube[j].slice(1));
            
            // Store orientation information.
            map[i][j]["pos"]   = faceData[i].pos;      
            map[i][j]["index"] = faceData[i].index;  
            
            // Store a direct reference to the DOM face.
            map[i][j]["obj"]   = document.querySelector(`#c${map[i][j].cube} .face:nth-child(${faceAxis[map[i][j].pos][map[i][j].index]})`);      
        }
    }
}

export function updateBackground(map){
    // Synchronize every sticker color with the
    // current color configuration.
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 9; j++) {
            map[i][j].color = colors[map[i][j].faceId].color
            map[i][j].obj.style.backgroundColor = map[i][j].color
        }
    }
}

