import { cubeMap } from "./cubeMap.js"
import { layers } from "./layerHandler.js";
import { layerMove } from "./cubeRotation.js";

// resolution algorithm steps:
// 1. white cross
// 2. F2L
// 3. yellow cross
// 4. matching yellow cross sides
// 5. matching yellow corner
// 6. final moveset

export function getPieceByFaceId(piece, faceIds, map){
    // We get pieces by faceId and not color,
    // cause user can make every face the same color
    // however faceId is unique to the face and can't be changed.
    const temp = Array();
    let pieces;
    let cubeDict;
    let max;
    let cubeCorner;
    map.forEach(element => {
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
    "backLayer":  4,
    "leftLayer":  3,
    "rightLayer": 2,
    "upperLayer": 1,
    "downLayer":  5,
}
const faceToLayer = {
    0: "frontLayer",
    4: "backLayer",
    3: "leftLayer",
    2: "rightLayer",
    1: "upperLayer",
    5: "downLayer",
}
const moves = {
    "F": "frontLayer 1 1",
    "B": "backLayer -1 1",
    "L": "leftLayer -1 1",
    "R": "rightLayer 1 1",
    "U": "upperLayer -1 1",
    "D": "downLayer 1 1",
    "M": "midXLayer -1 1",
    "E": "midYLayer 1 1",
    "S": "midZLayer 1 1",

    "F'": "frontLayer -1 1",
    "B'": "backLayer 1 1",
    "L'": "leftLayer 1 1",
    "R'": "rightLayer -1 1",
    "U'": "upperLayer 1 1",
    "D'": "downLayer -1 1",
    "M'": "midXLayer 1 1",
    "E'": "midYLayer -1 1",
    "S'": "midZLayer -1 1",

    "x": "rightLayer midXLayer leftLayer 1 1 1 1 1 1",
    "y": "upperLayer midYLayer downLayer -1 -1 -1 1 1 1",
    "z": "frontLayer midZLayer backLayer 1 1 1 1 1 1",

    "x'": "rightLayer midXLayer leftLayer -1 -1 -1 1 1 1",
    "y'": "upperLayer midYLayer downLayer 1 1 1 1 1 1",
    "z'": "frontLayer midZLayer backLayer -1 -1 -1 1 1 1",

    "u": "upperLayer midYLayer -1 -1 1 1",
    "d": "downLayer midYLayer 1 1 1 1",
    "r": "rightLayer midXLayer 1 1 1 1",
    "l": "leftLayer midXLayer -1 -1 1 1",
    "f": "frontLayer midZLayer 1 1 1 1",
    "b": "backLayer midZLayer -1 -1 1 1",
    
    "u'": "upperLayer midYLayer 1 1 1 1",
    "d'": "downLayer midYLayer -1 -1 1 1",
    "r'": "rightLayer midXLayer -1 -1 1 1",
    "l'": "leftLayer midXLayer 1 1 1 1",
    "f'": "frontLayer midZLayer -1 -1 1 1",
    "b'": "backLayer midZLayer 1 1 1 1",

    "F2": "frontLayer 1 2",
    "B2": "backLayer -1 2",
    "L2": "leftLayer -1 2",
    "R2": "rightLayer 1 2",
    "U2": "upperLayer -1 2",
    "D2": "downLayer 1 2",
    "M2": "midXLayer -1 2",
    "E2": "midYLayer 1 2",
    "S2": "midZLayer 1 2",
}

function getMoveData(move){
    const content = moves[move].split(" ")
    const separator = (content.length / 3);

    return [content.slice(0, separator), content.slice(separator, separator * 2), content.slice(separator * 2, content.length)]
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

function whoIsKing(map, edgeFaces, edgeCube, frontCenter){
    let king;
    for (let i = 0; i < map[edgeFaces[0]].length; i++) {
        if (map[edgeFaces[0]][i].cube === edgeCube){
            if (map[edgeFaces[0]][i].faceId === frontCenter.faceId){
                king = edgeFaces[1]
            } else{
                king = edgeFaces[0]
            }
        }
    } 
    return king
}

function isKing(center, king, map){
    for (let i = 0; i < map.length; i++) {
        if (map[i][4] === center){
            console.log(center, king, i)
            return king === i;
        }   
    }
}

function kingAlgorithm(map){
    // execute moves on the copy

    const neighbors = [0, 1, 4]
    const foreigns = [2, 3, 5]
    let frontCenter;
    let upperCenter;
    let backCenter;
    let frontFace;
    let upperFace;
    let backFace;
    let edge;
    let edgeCube;
    let edgeFaces;
    let king;
    let other;
    let move;
    let moveData;

    let running = true;

    // while (running) {
        
    // }

    while (running) {
        frontCenter = map[0][4]
        upperCenter = map[1][4]
        backCenter  = map[4][4]
        frontFace = getFacesByCube(frontCenter.cube)[0];
        upperFace = getFacesByCube(upperCenter.cube)[0];
        backFace  = getFacesByCube(backCenter.cube)[0];
        
        edge = getPieceByFaceId("edge", [frontCenter.faceId, upperCenter.faceId], map)
        edgeCube = Number(Object.keys(edge)[0])
        edgeFaces = getFacesByCube(edgeCube)

        king = whoIsKing(map, edgeFaces, edgeCube, frontCenter)
        
        // the edge is on a neighboring face
        if (neighbors.includes(edgeFaces[0]) || neighbors.includes(edgeFaces[1])){
            // case 1
            if (edgeFaces.includes(0)){
                console.log("~ The edge is on the front face");
                if (!edgeFaces.includes(1)){
                    console.log("# other face is foreign");
                    console.log("> ROTATE the foreign face twice, then go to CASE 3.");

                    // layerMove(btnValue, btnDirection, cubeMap, btnNbRotation, true);
                    other = edgeFaces[0] === 0 ? edgeFaces[1] : edgeFaces[0];
                    move = `${faceToLayer[other][0].toUpperCase()}2`;
                    moveData = getMoveData(move);

                    console.log(map)
                    console.log(other)
                    console.log(move)
                    console.log(moveData)
                    layerMove(moveData[0], moveData[1], map, moveData[2], false)
                    console.log("after change:", map)
                } else if (!isKing(frontCenter, king, map)){
                    running = false
                }
                // else if (isKing(frontCenter, king, map)){
                //     console.log("# front is KING")
                //     console.log("> Go to CASE 2.");
                // }else{
                //     running = false;
                // }
            }
            // case 2
            if (edgeFaces.includes(1)){
                console.log("~ The edge is on the upper face.");
                if (isKing(upperCenter, king, map)){
                    console.log("# upper face is the KING");
                    console.log("> REPEAT U until the edge is located between the upper and front faces.");

                    if (edgeCube != 2){
                        if (edgeCube === 20){
                        move = "U2"
                        }else if (edgeCube === 10){
                            move = "U'"
                        }else if (edgeCube === 12){
                            move = "U"
                        }

                        moveData = getMoveData(move);
                        
                        console.log(map)
                        console.log(moveData)                    
                        layerMove(moveData[0], moveData[1], map, moveData[2], false)
                        console.log("after change:", map)
                    }

                    running = false;
                }
                else if (edgeCube !== 20){
                    console.log("# upper face is not the KING");
                    console.log("> REPEAT U until the edge is located between the upper and back faces, then go to CASE 3.");

                    if (edgeCube === 2){
                        move = "U2"
                    }else if (edgeCube === 10){
                        move = "U"
                    }else if (edgeCube === 12){
                        move = "U'"
                    }

                    moveData = getMoveData(move);
                    
                    console.log(map)
                    console.log(moveData)                    
                    layerMove(moveData[0], moveData[1], map, moveData[2], false)
                    console.log("after change:", map)
                }
            }
            // case 3
            if (edgeFaces.includes(4)){
                console.log("~ The edge is on the back face.");
                console.log(backCenter, king, backCenter.cube)
                if (isKing(backCenter, king, map)){
                    console.log("# back face is the KING");
                    console.log("> REPEAT B until the edge is located between the upper and back faces, then execute: B L U' L'");

                    if (edgeCube !== 20){
                        if (edgeCube === 26){
                            move = "B2"
                        }else if (edgeCube === 22){
                            move = "B'"
                        }else if (edgeCube === 24){
                            move = "B"
                        }

                        moveData = getMoveData(move);

                        console.log(map)
                        console.log(moveData)                    
                        layerMove(moveData[0], moveData[1], map, moveData[2], false)
                        console.log("after change:", map)
                    }

                    // B L U' L'
                    const chainMove = ["B", "L", "U'", "L'"]
                    for (let i = 0; i < chainMove.length; i++) {
                        moveData = getMoveData(chainMove[i]);

                        console.log(map)
                        console.log(moveData)
                        layerMove(moveData[0], moveData[1], map, moveData[2], false)
                        console.log("after change:", map)
                    }

                    running = false;
                }else{
                    if (edgeCube !== 20){
                        if (edgeCube === 26){
                            move = "B2"
                        }else if (edgeCube === 22){
                            move = "B'"
                        }else if (edgeCube === 24){
                            move = "B"
                        }

                        moveData = getMoveData(move);

                        console.log(map)
                        console.log(moveData)                    
                        layerMove(moveData[0], moveData[1], map, moveData[2], false)
                        console.log("after change:", map)
                    }
                    console.log("# back face is not the KING");
                    console.log("> REPEAT B until the edge is located between the upper and back faces, then go to CASE 2.");
                }
            }
        }else{
            console.log("~ The edge is located between two foreign faces.");
            if (edgeFaces.includes(3)){
                console.log("# the edge is between the left and down faces");
                console.log("> Execute: D' B' D");

                const chainMove = ["D'", "B'", "D"]
                for (let i = 0; i < chainMove.length; i++) {
                    moveData = getMoveData(chainMove[i]);

                    console.log(map)
                    console.log(moveData)
                    layerMove(moveData[0], moveData[1], map, moveData[2], false)
                    console.log("after change:", map)
                }
            }else{
                console.log("# the edge is between the right and down faces");
                console.log("> Execute: D B D'");

                const chainMove = ["D", "B", "D'"]
                for (let i = 0; i < chainMove.length; i++) {
                    moveData = getMoveData(chainMove[i]);

                    console.log(map)
                    console.log(moveData)
                    layerMove(moveData[0], moveData[1], map, moveData[2], false)
                    console.log("after change:", map)
                }
            }
            console.log("> go to CASE 3.")
        }
    }
    console.log("~ edge is correctly placed")
    console.log("> Execute z'")

    moveData = getMoveData("z'");
    layerMove(moveData[0], moveData[1], map, moveData[2], false)
}

export function setCross(){
    // get a copy of the cube.
    let map = [...cubeMap];

    // const neighbors = [0, 1, 4]
    // const foreigns = [2, 3, 5]
    // let frontCenter;
    // let upperCenter;
    // let frontFace;
    // let upperFace;
    // let edge;
    // let edgeCube;
    // let edgeFaces;
    // let king;

    // for (let i = 0; i < 1; i++) {
    //     frontCenter = map[0][4]
    //     upperCenter = map[1][4]
    //     frontFace = getFacesByCube(frontCenter.cube)[0];
    //     upperFace = getFacesByCube(upperCenter.cube)[0];
        
    //     edge = getPieceByFaceId("edge", [frontCenter.faceId, upperCenter.faceId], map)
    //     edgeCube = Number(Object.keys(edge)[0])
    //     edgeFaces = getFacesByCube(edgeCube)

    //     king = whoIsKing(map, edgeFaces, edgeCube, frontCenter)


    //     console.log(edge)
    //     console.log(edgeFaces)
    //     console.log([frontCenter, upperCenter])
    //     console.log(king)
    // }

    for (let i = 0; i < 4; i++) {
        kingAlgorithm(map)  
    }
    // kingAlgorithm(map)


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