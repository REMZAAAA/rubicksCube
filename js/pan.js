const canvas = document.querySelector("#canvas");
const mainCube = document.querySelector("#mainCube");

let drag = false;

let x = 0;
let y = 0;

const posX = -30;
const posY = -45;

let rx = posX;
let ry = posY;

document.querySelectorAll(".cube p").forEach(element => {
    element.style.transform = `rotateY(${-posY}deg) rotateX(${-posX}deg)`;
});

canvas.addEventListener("pointerdown", e => {
    // Ignore interactions coming from the menu.
    if (e.target.closest("#menu")) return;
    
    drag = true;
    // Store the pointer position at the start
    // of the drag operation.
    x = e.clientX;
    y = e.clientY;

    // Capture the pointer so dragging continues
    // even if the cursor leaves the cube area.
    mainCube.setPointerCapture(e.pointerId);
});

canvas.addEventListener("pointermove", e => {
    // Only rotate the cube while dragging.
    if (!drag) return;

    ry += (e.clientX - x) * 0.4;
    rx -= (e.clientY - y) * 0.4;

    x = e.clientX;
    y = e.clientY;

    mainCube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

    // In debug mode, cube IDs must remain readable.
    // Rotate them in the opposite direction so they
    // always face the camera.
    if (mainCube.classList.contains("showCell")) {
        document.querySelectorAll(".cube p").forEach(element => {
            element.style.transform = `rotateY(${-ry}deg) rotateX(${-rx}deg)`;
        });
    }
});

canvas.addEventListener("pointerup", () => drag = false);

export function resetPosition(ms){
    mainCube.style.transition = `transform ${ms / 1000}s ease`;
    mainCube.style.transform = `rotateX(${posX}deg) rotateY(${posY}deg)`;

    setTimeout(() => {
        mainCube.style.transition = `none`;
        document.querySelectorAll(".cube p").forEach(element => {
            element.style.transform = `rotateY(${-posY}deg) rotateX(${-posX}deg)`;
        });
        rx = posX;
        ry = posY;
    }, ms);
}