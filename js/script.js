import { mainCube, layer } from "./layerHandler.js"
import { cubeMap, resetMap } from "./cubeMap.js"
import { renderMap } from "./cubeRenderer.js"
import { layerMove, animationDuration } from "./cubeRotation.js"
import { resetHistory, addMove, removeMove, checkForDouble, checkForTriple, checkForOpposite } from "./moveHistory.js"

mainCube.appendChild(layer);

const btnList = document.querySelectorAll("#moves button");
btnList.forEach(element => {
    element.addEventListener("click", () => {
        // separate the names from the directions.
        const btnContent = element.value.split(" ");
        const separator = (btnContent.length / 2);

        const btnValue = btnContent.slice(0, separator);
        const btnDirection = btnContent.slice(separator, btnContent.length);

        addMove(element.textContent);
        checkForDouble()
        checkForTriple()
        checkForOpposite()

        // e.g. 
        // F: ["frontLayer"], ["1"], 1
        // u: ["topLayer", midYlayer], ["-1", "-1"], 1      (U + E')
        layerMove(btnValue, btnDirection, 1);

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