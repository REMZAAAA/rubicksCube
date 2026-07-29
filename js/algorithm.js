import { cubeMap } from "./cubeMap.js"

// resolution algorithm steps:
// 1. white cross
// 2. F2L
// 3. yellow cross
// 4. matching yellow cross sides
// 5. matching yellow corner
// 6. final moveset

export function getPieceFaceId(piece, faceIds){
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