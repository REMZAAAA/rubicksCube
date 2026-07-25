const canvas = document.querySelector("#canvas");
const mainCube = document.querySelector("#mainCube");
const cellId = document.querySelectorAll(".cube p")

let drag = false;

let x = 0;
let y = 0;

let rx = -30;
let ry = -45;

canvas.addEventListener("pointerdown", e => {
    drag = true;
    x = e.clientX;
    y = e.clientY;

    mainCube.setPointerCapture(e.pointerId);
});

canvas.addEventListener("pointermove", e => {
    if (!drag) return;

    ry += (e.clientX - x) * 0.4;
    rx -= (e.clientY - y) * 0.4;

    x = e.clientX;
    y = e.clientY;

    mainCube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (mainCube.classList.contains("showCell")){
        cellId.forEach(element => {
            element.style.transform = `rotateX(${-rx}deg) rotateY(${-ry}deg)`;
        });
    }
});

canvas.addEventListener("pointerup", () => drag = false);