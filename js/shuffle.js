import { cubeMap, updateBackground } from "./cubeMap.js";
import { moves } from "./history.js";
import { executeMoves } from "./cubeRotation.js";
import { history, historyPanel } from "./main.js";

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function shuffleCube(){
    // Generate a 20-move scramble.
    for (let i = 0; i < 20; i++) {
        // Select a random move from the available buttons.
        const randomNumber = Math.floor(Math.random() * moves.length);

        const move = Object.keys(moves)[
            Math.floor(Math.random() * Object.keys(moves).length)
        ];
        executeMoves(move, cubeMap, history, historyPanel)
        updateBackground(cubeMap, true);
        await wait(0);
    }
    console.log("randomly mixed cubeMap:", cubeMap)
}