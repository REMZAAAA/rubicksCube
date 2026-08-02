import { animationDuration } from "./cubeRotation.js";

// All available move buttons.
// Used to generate random scramble sequences.
export const btnList = document.querySelectorAll("#moves button");

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function shuffleCube(){
    // Generate a 20-move scramble.
    for (let i = 0; i < 20; i++) {
        // Select a random move from the available buttons.
        const randomNumber = Math.floor(Math.random() * btnList.length);
        document.documentElement.style.setProperty("--animation-duration", 0) // no animation for shuffle.
        // Trigger the move using the same logic
        // as a normal button click.
        btnList[randomNumber].click();
        await wait(0);
    }
    // Restore the original animation duration.
    document.documentElement.style.setProperty("--animation-duration", animationDuration / 1000)
}