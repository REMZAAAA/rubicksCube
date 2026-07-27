import { mainCube, layer } from "./layerHandler.js"
import { cubeMap, resetMap } from "./cubeMap.js"
import { renderMap } from "./cubeRenderer.js"
import { layerMove, animationDuration } from "./cubeRotation.js"
import { resetHistory, addMove, checkForDouble, checkForTriple, checkForOpposite } from "./moveHistory.js"
import { updateColor, resetColor } from "./colors.js"
import { btnList, shuffleCube } from "./shuffle.js"

mainCube.appendChild(layer);

btnList.forEach(element => {                    // Whenever you click on a button (move).
    element.addEventListener("click", () => {   // It get the value of the button.
        // Then separate the names from the directions.
        const btnContent = element.value.split(" ");
        const separator = (btnContent.length / 3);

        const btnValue = btnContent.slice(0, separator);
        const btnDirection = btnContent.slice(separator, separator * 2);
        const btnNbRotation = btnContent.slice(separator * 2, btnContent.length);

        // It add the move to the history.
        addMove(element.textContent);
        checkForDouble()    // It then checks if it's possible
        checkForTriple()    // to shorten the move into one.
        checkForOpposite()  // e.g. F F -> F2; F F F -> F'; F F' -> (nothing c:)

        // Exemple of input:
        // F: ["frontLayer"], ["1"], 1
        // u: ["topLayer", midYlayer], ["-1", "-1"], 1
        console.log("\n#############################################\n\n")
        console.log("before move")
        renderMap(cubeMap)
        layerMove(btnValue, btnDirection, btnNbRotation);
        console.log("after move")
        renderMap(cubeMap)

        // disable every button when one is clicked.
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
    resetMap();
    resetHistory();
});

const shuffleEl = document.querySelector("#commands .shuffle")
shuffleEl.addEventListener("click", async () => {
    await shuffleCube();
});

const colorInputEl = document.querySelectorAll(".colors input");
colorInputEl.forEach(element => {
    element.addEventListener("change", () => {
        updateColor();
    });
});

const debugInput = document.querySelector("#menu .debug input");
debugInput.addEventListener("click", () => {
    if (debugInput.checked){
        mainCube.classList.add("showCell");
    } else{
        mainCube.classList.remove("showCell");
    }
})

const resetColorEl = document.querySelector("#menu .resetColor button")
resetColorEl.addEventListener("click", () => {
    resetColor();
});

renderMap(cubeMap);