export const main = document.querySelector("main");
const tempLayer = document.createElement("div");
tempLayer.className = "layer";
export const layer = tempLayer;

export function clearLayer(){
    let temp = layer.firstChild;
    
    while(layer.firstChild){
        main.appendChild(temp);
        temp = layer.firstChild;
    }
}

export const layers = [
    {
        "name": "frontLayer",
        "grid": [
                "c1","c2","c3",
                "c4","c5","c6",
                "c7","c8","c9",
                ],
        "rotateAxis": "z"
    },
    {
        "name": "backLayer",
        "grid": [
                // "c19","c20","c21",
                // "c22","c23","c24",
                // "c25","c26","c27",
                "c25","c26","c27",
                "c22","c23","c24",
                "c19","c20","c21",
                ],
        "rotateAxis": "z"
    },
        
    {
        "name": "leftLayer",
        "grid": [
                // "c1","c4","c7",
                // "c10","c13","c16",
                // "c19","c22","c25",
                "c19","c10","c1",
                "c22","c13","c4",
                "c25","c16","c7",
                ],
        "rotateAxis": "x"
    },
    {
        "name": "rightLayer",
        "grid": [
                // "c3","c6","c9",
                // "c12","c15","c18",
                // "c21","c24","c27",
                "c3","c12","c21",
                "c6","c15","c24",
                "c9","c18","c27",
                ],
        "rotateAxis": "x"
    },
        
    {
        "name": "topLayer",
        "grid": [
                // "c1","c2","c3",
                // "c10","c11","c12",
                // "c19","c20","c21",
                "c19","c20","c21",
                "c10","c11","c12",
                "c1","c2","c3",
                ],
        "rotateAxis": "y"
    },
    {
        "name": "bottomLayer",
        "grid": [
                "c7","c8","c9",
                "c16","c17","c18",
                "c25","c26","c27"
                ],
        "rotateAxis": "y"
    },
        
    {
        "name": "midXLayer",
        "grid": [
                "c2","c5","c8",
                "c11","c14","c17",
                "c20","c23","c26"
                ],
        "rotateAxis": "x"
    },
    {
        "name": "midYLayer",
        "grid": [
                "c4","c5","c6",
                "c13","c14","c15",
                "c22","c23","c24"
                ],
        "rotateAxis": "y"
    },
    {
        "name": "midZLayer",
        "grid": [
                "c10","c11","c12",
                "c13","c14","c15",
                "c16","c17","c18"
                ],
        "rotateAxis": "z"
    }
]

