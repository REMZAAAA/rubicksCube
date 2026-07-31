import { cubeMap, updateBackground } from "./cubeMap.js"
import { layers, layer, resetLayer } from "./layerHandler.js"

// Current animation duration in milliseconds.
// Can be increased when performing double turns.
let defaultDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--animation-duration").trim()) * 1000;
export let animationDuration = defaultDuration;

// exemple of input in script.js
export function layerMove(name, direction, nbRotation=1){
    // Read the base duration from CSS every time
    // in case it has been modified dynamically.
    defaultDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--animation-duration").trim()) * 1000;
    animationDuration = defaultDuration * parseInt(nbRotation);
    
    // If a previous animation was interrupted,
    // restore the layer before starting a new one.
    if (layer.childElementCount !== 0) {
        resetLayer();
    }

    // Multiple layers can be rotated simultaneously
    // (x, y, z cube rotations for example).
    for (let i = 0; i < name.length; i++) {
        executeLayerMove(name[i], parseInt(direction[i]),  parseInt(nbRotation));
    }
}

function executeLayerMove(name, direction, nbRotation){
    const layerName = getLayerByName(name);
    const layerGrid = layerName.grid;
    const layerRotateAxis = layerName.rotateAxis.toUpperCase();

    // Update CSS variables used by the animation.
    layer.style.setProperty("--rotate-value", `calc(90deg * ${nbRotation})`)
    document.documentElement.style.setProperty("--animation-duration", animationDuration / 1000)
    
    // The animation itself is entirely handled by CSS.
    layer.className = `layer rotate${layerRotateAxis} ${direction > 0 ? "normal" : "reverse"}`;
    layerGrid.forEach(id => { 
        layer.appendChild(document.querySelectorAll(`.cube#${id}`)[0]);
    })
    const move = getMoveData(name, direction);

    // Update the internal cube state immediately.
    // The visual animation will catch up afterwards.
    for (let i = 0; i < nbRotation; i++) {
        // M, E and S moves do not rotate a visible face.
        if (!move.oneLayer){
            rotateFace(move.face, move.direct);
        }
        rotateSides(
            ...move.sides,
            move.sideIndex,
            move.direct
        );
    }
    console.log(cubeMap);

    // Once the animation ends, restore the layer
    // and repaint the stickers.
    setTimeout(() => {
        layer.className = "layer";
        updateBackground(cubeMap);
    }, animationDuration)
}

function getLayerByName(name){
    for (let i = 0; i < layers.length; i++) {
        if(layers[i].name == name){
            return layers[i]
        };
    }
}

function getMoveData(name, direction){
    // Returns every piece of information required
    // to perform a move:
    // - face to rotate,
    // - adjacent sides,
    // - affected sticker indices,
    // - rotation direction.
    switch(name){
        case "frontLayer":
            return{
                face: cubeMap[0],
                // Adjacent faces ordered clockwise
                // when looking directly at the front face.
                sides: [
                    cubeMap[1],
                    cubeMap[2],
                    cubeMap[5],
                    cubeMap[3]
                ],
                // Stickers affected on each side.
                // Debug mode is very useful to visualize
                // these coordinates.
                sideIndex: [  
                    [7, 8, 9],
                    [1, 4, 7],
                    [1, 2, 3],
                    [3, 6, 9] 
                ],
                direct: direction,
                oneLayer: false
            };
        case "backLayer":
            return{
                face: cubeMap[4],
                sides: [
                    cubeMap[5],
                    cubeMap[2],
                    cubeMap[1],
                    cubeMap[3]
                ],
                sideIndex: [
                    [7, 8, 9],
                    [9, 6, 3],
                    [1, 2, 3],
                    [7, 4, 1]
                ],
                // Looking at the back face reverses
                // the perceived rotation direction.
                direct: direction * -1,
                oneLayer: false
            };
        case "leftLayer":
            return{
                face: cubeMap[3],
                sides: [
                    cubeMap[0],
                    cubeMap[5],
                    cubeMap[4],
                    cubeMap[1]
                ],
                sideIndex: [
                    [1, 4, 7],
                    [1, 4, 7],
                    [7, 4, 1],
                    [7, 4, 1]
                ],
                direct: direction * -1,
                oneLayer: false
            };
        case "rightLayer":
            return{
                face: cubeMap[2],
                sides: [
                    cubeMap[1],
                    cubeMap[4],
                    cubeMap[5],
                    cubeMap[0]
                ],
                sideIndex: [
                    [9, 6, 3],
                    [9, 6, 3],
                    [3, 6, 9],
                    [3, 6, 9]
                ],
                direct: direction,
                oneLayer: false
            };
        case "upperLayer":
            return{
                face: cubeMap[1],
                sides: [
                    cubeMap[4],
                    cubeMap[2],
                    cubeMap[0],
                    cubeMap[3]
                ],
                sideIndex: [
                    [7, 8, 9],
                    [3, 2, 1],
                    [1, 2, 3],
                    [1, 2, 3]
                ],
                direct: direction * -1,
                oneLayer: false
            };
        case "downLayer":
            return{
                face: cubeMap[5],
                sides: [
                    cubeMap[0],
                    cubeMap[2],
                    cubeMap[4],
                    cubeMap[3]
                ],
                sideIndex: [
                    [7, 8, 9],
                    [7, 8, 9],
                    [1, 2, 3],
                    [9, 8, 7]
                ],
                direct: direction,
                oneLayer: false
            }

        // Slice moves.
        // They only affect the middle layer and
        // therefore have no visible face to rotate.
        case "midXLayer":
            return{
                sides: [
                    cubeMap[1],
                    cubeMap[4],
                    cubeMap[5],
                    cubeMap[0]
                ],
                sideIndex: [
                    [8, 5, 2],
                    [8, 5, 2],
                    [2, 5, 8],
                    [2, 5, 8]
                ],
                direct: direction,
                oneLayer: true
            };
        case "midYLayer":
            return{
                sides: [
                    cubeMap[4],
                    cubeMap[2],
                    cubeMap[0],
                    cubeMap[3]
                ],
                sideIndex: [
                    [4, 5, 6],
                    [6, 5, 4],
                    [4, 5, 6],
                    [4, 5, 6]
                ],
                direct: direction * -1,
                oneLayer: true
            };
        case "midZLayer":
            return{
                sides: [
                    cubeMap[1],
                    cubeMap[2],
                    cubeMap[5],
                    cubeMap[3]
                ],
                sideIndex: [
                    [4, 5, 6],
                    [2, 5, 8],
                    [4, 5, 6],
                    [2, 5, 8]
                ],
                direct: direction,
                oneLayer: true
            };
    }
}

function rotateFace(face, direction){
    // Create a snapshot of the current face
    // before overwriting any sticker.
    const faceTemp = Array();
    for (let i = 0; i < face.length; i++) {
        faceTemp.push({
            "color": face[i].color,
            "faceId": face[i].faceId,
        })        
    }

    // Clockwise permutation.
    let faceTempIndex = [6, 3, 0, 7, 4, 1, 8, 5, 2]
    // Counter-clockwise permutation.
    if (direction < 0) faceTempIndex.reverse();

    for (let i = 0; i < face.length; i++) {
        swapStickers(face[i], faceTemp[faceTempIndex[i]])
    }
}

function rotateSides(side1, side2, side3, side4, sideIndex, direction){
    // Temporary storage for the four rows/columns
    // exchanged during the move.
    const faceTemp1 = Array();
    const faceTemp2 = Array();
    const faceTemp3 = Array();
    const faceTemp4 = Array();
    const sideIndex1 = sideIndex[0];
    const sideIndex2 = sideIndex[1];
    const sideIndex3 = sideIndex[2];
    const sideIndex4 = sideIndex[3];

    for (let i = 0; i < 3; i++) {
        // Some strips must be reversed when moving
        // between faces with different orientations.
        let counterClockwiseIndex;
        let clockwiseIndex;

        counterClockwiseIndex = (2 * (direction > 0))-i;
        clockwiseIndex = (2 * (direction < 0))-i;
        counterClockwiseIndex = counterClockwiseIndex < 0 ? counterClockwiseIndex * -1 : counterClockwiseIndex;
        clockwiseIndex = clockwiseIndex < 0 ? clockwiseIndex * -1 : clockwiseIndex;

        faceTemp1.push({
            "color": side1[sideIndex1[clockwiseIndex] - 1].color,
            "faceId": side1[sideIndex1[clockwiseIndex] - 1].faceId
        });
        faceTemp2.push({
            "color": side2[sideIndex2[counterClockwiseIndex] - 1].color,
            "faceId": side2[sideIndex2[counterClockwiseIndex] - 1].faceId
        });
        faceTemp3.push({
            "color": side3[sideIndex3[clockwiseIndex] - 1].color,
            "faceId": side3[sideIndex3[clockwiseIndex] - 1].faceId
        });
        faceTemp4.push({
            "color": side4[sideIndex4[counterClockwiseIndex] - 1].color,
            "faceId": side4[sideIndex4[counterClockwiseIndex] - 1].faceId
        });
    }

    // Clockwise cycle.
    let faceTempIndex = [faceTemp4, faceTemp1, faceTemp2, faceTemp3]
    let sideList = [
        [side1, sideIndex1],
        [side2, sideIndex2],
        [side3, sideIndex3],
        [side4, sideIndex4],
    ]
    // Counter-clockwise cycle.
    if (direction < 0) faceTempIndex = swapIndex(faceTempIndex, [2, 3, 0, 1]);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            swapStickers(sideList[i][0][sideList[i][1][j] - 1], faceTempIndex[i][j])
        }
    }
}

function swapIndex(list, newIndex){
    // Returns a reordered copy of an array
    // according to the provided indices.
    let temp = Array()
    for (let i = 0; i < list.length; i++) {
        temp[i] = list[newIndex[i]];
    }
    return temp
}

function swapStickers(sticker, target){
    // Only sticker data is exchanged.
    // Cube positions remain unchanged.
    sticker.faceId = target.faceId
    sticker.color = target.color
}