import { mainCube, layer } from "./layerHandler.js"
import { cubeMap, getPieceByFaceId } from "./cubeMap.js"
import { setCross } from "./algorithm.js"
import { renderMap } from "./cubeRenderer.js"

export const history = Array();
export const historyPanel = document.getElementById("history");

export function doCrossAlgo(){
    setCross();
}

window.doCrossAlgo = doCrossAlgo;

// The temporary rotation layer must be attached
// to the cube before any move can be animated.
mainCube.appendChild(layer);

renderMap(cubeMap);

const tests = [
    getPieceByFaceId("corner", [0, 1, 2], cubeMap),
    getPieceByFaceId("corner", [0, 1], cubeMap),
    getPieceByFaceId("corner", [0], cubeMap),
    getPieceByFaceId("edge"  , [0, 1], cubeMap),
    getPieceByFaceId("edge"  , [0], cubeMap),
    getPieceByFaceId("center", [0], cubeMap),
]

console.log(tests)