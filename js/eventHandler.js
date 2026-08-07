import { executeMoves } from "./cubeRotation.js";
import { cubeMap, resetMap } from "./cubeMap.js";
import { resetHistory, deleteGroup } from "./history.js";
import { shuffleCube } from "./shuffle.js";
import { updateColor, resetColor } from "./colors.js";
import { history, historyPanel, animationDuration } from "./main.js";
import { createPopup } from "./popup.js";
import { resetPosition } from "./pan.js";

const btnList = document.querySelectorAll("#controls .moves button");
btnList.forEach(element => {
    element.addEventListener("click", () => {
        const moveName = element.textContent;

        // execute the move.
        executeMoves(moveName, "user", cubeMap, history, historyPanel, animationDuration, true)

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

const picker = document.querySelector(".paintCube");
const preview = picker.querySelectorAll("span");
const input = picker.querySelectorAll("input");

preview.forEach(element => {
    const inputColor = element.querySelector("input");

    element.addEventListener("click", () => {
        // picker.style.backgroundColor = inputColor.value;
        picker.style.backgroundColor = inputColor.value + "99";
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
        picker.style.backgroundColor = element.value + "99";
    });
});

const resetColorEl = document.querySelector(".resetColor button")
resetColorEl.addEventListener("click", () => {
    // Restore the default cube color scheme.
    resetColor();
});

const resetPosEl = document.querySelector(".resetPos button")
resetPosEl.addEventListener("click", () => {
    // Restore the default cube position.
    resetPosition(animationDuration);
});

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

// 

const popup = document.getElementById("popup");
let selectedGroup = null;

historyPanel.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    selectedGroup = button;
    const groupId = parseInt(selectedGroup.id);
    const groupChildren = [...selectedGroup.children]
        .map(child => child.textContent)
        .join(", ");

    createPopup(
    "Are you sure you want to delete this following group ?",
    ["GROUP ID:", groupId],
    ["GROUP CHILDREN:", groupChildren])
    popup.style.display = "grid";
});


popup.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (!button) return;

    if (button.textContent === "yes") {
        deleteGroup(history, historyPanel, parseInt(selectedGroup.id));
    }

    popup.style.display = "none";
});

