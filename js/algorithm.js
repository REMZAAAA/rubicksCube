import { cubeMap } from "./cubeMap.js"
import { layers } from "./layerHandler.js";

// resolution algorithm steps:
// 1. white cross
// 2. F2L
// 3. yellow cross
// 4. matching yellow cross sides
// 5. matching yellow corner
// 6. final moveset

export function getPieceByFaceId(piece, faceIds){
    // We get pieces by faceId and not color,
    // cause user can make every face the same color
    // however faceId is unique to the face and can't be changed.
    const temp = Array();
    let pieces;
    let cubeDict;
    let max;
    let cubeCorner;
    cubeMap.forEach(element => {
        for (let i = 0; i < element.length; i++) {
            // for all pieces (56) we get those who match:
            if (element[i].piece == piece &&          // Matches the requested piece type,
                faceIds.includes(element[i].faceId)){ // and one of the requested face IDs.
                temp.push(element[i])
            }
            cubeDict = {};
            // Build a weighted object where:
            // key   = cube ID
            // value = number of matching faces found on that cube.
            for (let j = 0; j < temp.length; j++) {
                // A cube can contain up to:
                // - 3 faces for a corner,
                // - 2 faces for an edge,
                // - 1 face for a center.
                // The more matching faces a cube has, the more relevant it is.
                cubeDict[temp[j].cube] = !cubeDict[temp[j].cube] ? 1 : cubeDict[temp[j].cube] + 1;
            }

            // Find the cube(s) with the highest score.
            // Multiple cube may share the same score,
            // so the result can contain several cube IDs.
            max = Math.max(...Object.values(cubeDict));
            cubeCorner = Object.keys(cubeDict)
                .filter(key => cubeDict[key] === max)
                .map(Number);
            pieces = {};

            // Collect all matching faces that belong
            // to the selected cube(s).
            for (let j = 0; j < temp.length; j++) {
                if (cubeCorner.includes(temp[j].cube)){
                    if (!pieces[temp[j].cube]) pieces[temp[j].cube] = Array();
                    pieces[temp[j].cube].push(temp[j])
                }
            }
        }
    });
    return pieces
}

const layerToFace = {
    "frontLayer": 0,
    "backLayer": 4,
    "leftLayer": 3,
    "rightLayer": 2,
    "topLayer": 1,
    "bottomLayer": 5,
}

function getFacesByCube(cube){
    const temp = Array();
    for (let i = 0; i < layers.length - 3; i++) {
        if (layers[i].grid.includes(`c${cube}`)){
            temp.push(layerToFace[layers[i].name])
        }
    }
    // should return an Array which contains
    // min 1, max 3 integers (faces).
    return temp;
}

export function setCross(){
    // first get center of the front face.
    const center = cubeMap[0][4];
    const centerCube = getFacesByCube(center.cube)[0]

    // let edges = getPieceByFaceId("edge", [center.faceId])
    // console.log(center, edges)

    const faces = [cubeMap[1], cubeMap[2], cubeMap[5], cubeMap[3]]
    const oppositeFace = cubeMap[4];

    for (let i = 0; i < faces.length; i++) {
        // search an edge with the two face center
        // first center is always the one we building the cross on,
        // the second is in this order: top, right, bottom, left.
        const secondCenter = faces[i][4]
        const secondCenterCube = getFacesByCube(faces[i][4].cube)[0]
        const edge = getPieceByFaceId("edge", [center.faceId, secondCenter.faceId])
        // getFacesByCube(edge)
        const edgeCube = Number(Object.keys(edge)[0])
        const edgeFaces = getFacesByCube(edgeCube)

        console.log(edge)
        console.log(edgeFaces)
        console.log([centerCube, secondCenterCube])

        for (let j = 0; j < cubeMap[edgeFaces[0]].length; j++) {
            if (cubeMap[edgeFaces[0]][j].cube === edgeCube){
                // console.log(cubeMap[edgeFaces[0]][j]);
                if (cubeMap[edgeFaces[0]][j].faceId === center.faceId){
                    edgeFaces.push(edgeFaces[1])
                } else{
                    edgeFaces.push(edgeFaces[0])
                }
            }
        }

        console.log(edgeFaces)
    }
}