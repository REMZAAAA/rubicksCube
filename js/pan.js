const cube = document.querySelector("main");

let drag = false;

let x = 0;
let y = 0;

let rx = -30;
let ry = -45;

cube.addEventListener("pointerdown", e => {
    drag = true;
    x = e.clientX;
    y = e.clientY;

    cube.setPointerCapture(e.pointerId);
});

cube.addEventListener("pointermove", e => {
    if (!drag) return;

    ry += (e.clientX - x) * 0.4;
    rx -= (e.clientY - y) * 0.4;

    x = e.clientX;
    y = e.clientY;

    cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
});

cube.addEventListener("pointerup", () => drag = false);