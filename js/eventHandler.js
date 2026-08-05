import { executeMoves, animationDuration } from "./cubeRotation.js";
import { cubeMap, resetMap } from "./cubeMap.js";
import { resetHistory } from "./history.js";
import { shuffleCube } from "./shuffle.js";
import { updateColor, resetColor } from "./colors.js";
import { history, historyPanel } from "./main.js";

const btnList = document.querySelectorAll("#controls button");
btnList.forEach(element => {
    element.addEventListener("click", () => {
        const moveName = element.textContent;

        // execute the move.
        executeMoves(moveName, "user", cubeMap, history, historyPanel, true)

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

const resetEL = document.querySelector("#commands .reset")
resetEL.addEventListener("click", () => {
    // Restore the cube to its solved state
    // and clear the move history.
    resetMap();
    resetHistory(history, historyPanel);
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
    document.querySelector("#controls .moves").style.display = resolveMode ? "none" : "flex";
    resolveEl.classList.toggle("active")
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
const mainCube = document.getElementById("mainCube");
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