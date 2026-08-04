import { layer } from "./layerHandler.js"
import { cubeMap, getPieceByFaceId } from "./cubeMap.js"
import { setCross } from "./algorithm.js"
import { renderMap } from "./cubeRenderer.js"
import { createMoves } from "./history.js"

export const history = Array();
export const historyPanel = document.getElementById("history");
export const mainCube = document.getElementById("mainCube");

export function doCrossAlgo(){
    setCross();
}
window.doCrossAlgo = doCrossAlgo;

// const tests = [
//     getPieceByFaceId("corner", [0, 1, 2], cubeMap),
//     getPieceByFaceId("corner", [0, 1], cubeMap),
//     getPieceByFaceId("corner", [0], cubeMap),
//     getPieceByFaceId("edge"  , [0, 1], cubeMap),
//     getPieceByFaceId("edge"  , [0], cubeMap),
//     getPieceByFaceId("center", [0], cubeMap),
// ]

// console.log(tests)

mainCube.appendChild(layer);

createMoves();

renderMap(cubeMap);
