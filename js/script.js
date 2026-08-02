import { mainCube, layer } from "./layerHandler.js"
import { cubeMap, resetMap, getPieceByFaceId } from "./cubeMap.js"
import { layerMove, animationDuration } from "./cubeRotation.js"
import { resetHistory, addMove} from "./moveHistory.js"
import { updateColor, resetColor } from "./colors.js"
import { shuffleCube } from "./shuffle.js"
import { setCross } from "./algorithm.js"
import { renderMap } from "./cubeRenderer.js"

export const history = Array();
export const historyBar = document.getElementById("history");

// The temporary rotation layer must be attached
// to the cube before any move can be animated.
mainCube.appendChild(layer);

const btnList = document.querySelectorAll("#moves button");

btnList.forEach(element => {         
    // Every move button contains all the data needed
    // to perform the corresponding move.
    element.addEventListener("click", () => {
        // Parse the button value.
        // Example:
        // "frontLayer 1 1"
        // "upperLayer equatorLayer -1 -1 1 1"
        const btnContent = element.value.split(" ");
        const separator = (btnContent.length / 3);

        // Extract:
        // - layer names,
        // - directions,
        // - number of quarter turns.
        const btnValue = btnContent.slice(0, separator);
        const btnDirection = btnContent.slice(separator, separator * 2);
        const btnNbRotation = btnContent.slice(separator * 2, btnContent.length);

        // add the move to the history.
        addMove(history, element.textContent, historyBar);
        
        // Exemple of input:
        // F: ["frontLayer"], ["1"], 1
        // u: ["upperLayer", midYlayer], ["-1", "-1"], 1
        layerMove(btnValue, btnDirection, cubeMap, btnNbRotation, true);

        // Prevent move spam while an animation
        // is currently playing.
        btnList.forEach(el => {
            el.disabled = true;
            setTimeout(() => {
                el.disabled = false;
            }, animationDuration * 1)
        });
        
    });
});

export function doCrossAlgo(){
    setCross();
}

window.doCrossAlgo = doCrossAlgo;

const resetEL = document.querySelector("#commands .reset")
resetEL.addEventListener("click", () => {
    // Restore the cube to its solved state
    // and clear the move history.
    resetMap();
    resetHistory(history, historyBar);
});

const shuffleEl = document.querySelector("#commands .shuffle")
shuffleEl.addEventListener("click", async () => {
    // Perform a random shuffle sequence.
    await shuffleCube();
});

let resolveMode = false;

const resolveEl = document.querySelector("#commands .resolve")
resolveEl.addEventListener("click", () => {
    resolveMode = !resolveMode;
    document.querySelector("#moves .slider").style.visibility = resolveMode ? "hidden" : "visible";
});

const colorInputEl = document.querySelectorAll(".colors input");
colorInputEl.forEach(element => {
    // Update cube colors whenever the user
    // changes a color picker.
    element.addEventListener("change", () => {
        updateColor();
    });
});

const debugInput = document.querySelector("#menu .debug input");
debugInput.addEventListener("click", () => {
    // Debug mode displays cube IDs
    // directly on the cube.
    if (debugInput.checked){
        mainCube.classList.add("showCell");
    } else{
        mainCube.classList.remove("showCell");
    }
})

const resetColorEl = document.querySelector("#menu .resetColor button")
resetColorEl.addEventListener("click", () => {
    // Restore the default cube color scheme.
    resetColor();
});

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