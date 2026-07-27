import { animationDuration } from "./cubeRotation.js";

export const btnList = document.querySelectorAll("#moves button");
function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function shuffleCube(){
    let tempAnim = animationDuration;
    for (let i = 0; i < 20; i++) {
        const randomNumber = Math.floor(Math.random() * btnList.length);
        document.documentElement.style.setProperty("--animation-duration", 0) // no animation for shuffle.
        btnList[randomNumber].click();
        await wait(animationDuration);
    }
    document.documentElement.style.setProperty("--animation-duration", tempAnim / 1000)
}