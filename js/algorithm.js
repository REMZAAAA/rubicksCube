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
    "upperLayer": 1,
    "downLayer": 5,
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

        // KING algorithm
        //
        // Faces are kingdoms. Centers and edges are lands.
        // The front, upper, and back faces are considered neighbors.
        // The remaining faces are foreign kingdoms.
        //
        // An edge contains 2 colors, therefore it appears between
        // EXACTLY 2 faces.
        //
        // Even though an edge is located between 2 faces, it belongs
        // to only one kingdom. We call KING the face where the edge
        // appears while its sticker color does NOT match the center
        // color of the cross.

        // CASES 1 - 3 (the edge is on a neighboring face)

        // CASE 1
        // The edge is on the front face.
        //
        // If the other face is foreign:
        //   ROTATE the foreign face twice, then go to CASE 3.
        // Else if the front face is the KING of this edge:
        //   Go to CASE 2.
        // Else:
        //   DO NOTHING (the edge is already correctly placed).

        // CASE 2
        // The edge is on the upper face.
        //
        // If the upper face is the KING of this edge:
        //   REPEAT U until the edge is located between
        //   the upper and front faces.
        // Else:
        //   REPEAT U until the edge is located between
        //   the upper and back faces, then go to CASE 3.

        // CASE 3
        // The edge is on the back face.
        //
        // If the back face is the KING of this edge:
        //   REPEAT B until the edge is located between
        //   the upper and back faces, then execute:
        //   B L U' L'
        // Else:
        //   REPEAT B until the edge is located between
        //   the upper and back faces, then go to CASE 2.

        // CASE 4
        // The edge is located between two foreign faces.
        //
        // Execute:
        //   D' B' D (if the edge is between the left and down faces)
        // or
        //   D B D' (if the edge is between the right and down faces)
        //
        // Then go to CASE 3.

        // When the edge is correctly placed:
        //   Execute z'
        //   Then REPEAT the KING Algorithm.
    }
}