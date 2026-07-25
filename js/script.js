import { mainCube, layer } from "./layerHandler.js"
import { cubeMap, resetMap } from "./cubeMap.js"
import { renderMap } from "./cubeRenderer.js"
import { layerMove, animationDuration } from "./cubeRotation.js"
import { resetHistory, addMove, removeMove, checkForDouble, checkForTriple, checkForOpposite } from "./moveHistory.js"

mainCube.appendChild(layer);

const btnList = document.querySelectorAll("#moves button");
btnList.forEach(element => {                    // Whenever you click on a button (move).
    element.addEventListener("click", () => {   // It get the value of the button.
        // Then separate the names from the directions.
        const btnContent = element.value.split(" ");
        const separator = (btnContent.length / 3);

        const btnValue = btnContent.slice(0, separator);
        const btnDirection = btnContent.slice(separator, separator * 2);
        const btnNbRotation = btnContent.slice(separator * 2, btnContent.length);

        console.log(btnValue, btnDirection, btnNbRotation);

        // It add the move to the history.
        addMove(element.textContent);
        checkForDouble()    // It then checks if it's possible
        checkForTriple()    // to shorten the move into one.
        checkForOpposite()  // e.g. F F -> F2; F F F -> F'; F F' -> (nothing c:)

        // Exemple of input:
        // F: ["frontLayer"], ["1"], 1
        // u: ["topLayer", midYlayer], ["-1", "-1"], 1
        layerMove(btnValue, btnDirection, btnNbRotation);

        // disable every button when one is clicked.
        btnList.forEach(el => {
            el.disabled = true;
            setTimeout(() => {
                el.disabled = false;
            }, animationDuration * 1)
        });
        
    });
});

const reset = document.querySelector("#reset button")
reset.addEventListener("click", () => {
    resetMap();
    resetHistory();
});

renderMap(cubeMap);