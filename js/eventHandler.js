import { executeMoves, animationDuration } from "./cubeRotation.js";
import { cubeMap, resetMap } from "./cubeMap.js";
import { resetHistory } from "./history.js";
import { shuffleCube } from "./shuffle.js";
import { updateColor, resetColor } from "./colors.js";
import { history, historyPanel } from "./main.js";

const btnList = document.querySelectorAll("#controls .moves button");
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

const resolveBtn = document.querySelector("#commands .resolve")
const toolsEl = document.querySelector("#controls .tools")
resolveBtn.addEventListener("click", () => {
    resolveMode = !resolveMode;
    document.querySelector("#controls .moves").style.display = resolveMode ? "none" : "flex";
    toolsEl.style.display = resolveMode ? "flex" : "none";
    resolveBtn.classList.toggle("active")
});

// 

const debugInput = document.querySelector(".debug input");
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

const resetColorEl = document.querySelector(".resetColor button")
resetColorEl.addEventListener("click", () => {
    // Restore the default cube color scheme.
    resetColor();
});

const picker = document.querySelector(".paintCube");
const preview = picker.querySelectorAll("span");
const input = picker.querySelectorAll("input");

preview.forEach(element => {
    const inputColor = element.querySelector("input");

    element.addEventListener("click", () => {
        picker.style.backgroundColor = inputColor.value;
    });

    // PC (right click)
    element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        inputColor.showPicker();
    });

    // Mobile (long press)
    let timer;

    element.addEventListener("pointerdown", () => {
        timer = setTimeout(() => {
            inputColor.showPicker();
        }, 600);
    });

    element.addEventListener("pointerup", () => {
        clearTimeout(timer);
    });

    element.addEventListener("pointerleave", () => {
        clearTimeout(timer);
    });
});

input.forEach(element => {
    element.addEventListener("change", () => {
        updateColor();
        picker.style.backgroundColor = element.value
    });
});