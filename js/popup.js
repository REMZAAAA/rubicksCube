export function createPopup(title, id, desc){
    const popup = document.getElementById("popup");
    popup.querySelector(".title").textContent = title
    popup.querySelector(".id p:nth-of-type(1)").textContent = id[0]
    popup.querySelector(".id p:nth-of-type(2)").textContent = id[1]
    popup.querySelector(".desc p:nth-of-type(1)").textContent = desc[0]
    popup.querySelector(".desc p:nth-of-type(2)").textContent = desc[1]
}