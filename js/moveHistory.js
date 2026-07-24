const opposite = {
    "F": "F'",
    "F'": "F",
    "F2": "F'2",
    "F'2": "F2",

    "B": "B'",
    "B'": "B",
    "B2": "B'2",
    "B'2": "B2",

    "L": "L'",
    "L'": "L",
    "L2": "L'2",
    "L'2": "L2",

    "R": "R'",
    "R'": "R",
    "R2": "R'2",
    "R'2": "R2",

    "U": "U'",
    "U'": "U",
    "U2": "U'2",
    "U'2": "U2",

    "D": "D'",
    "D'": "D",
    "D2": "D'2",
    "D'2": "D2",

    "M": "M'",
    "M'": "M",
    "M2": "M'2",
    "M'2": "M2",

    "E": "E'",
    "E'": "E",
    "E2": "E'2",
    "E'2": "E2",

    "S": "S'",
    "S'": "S",
    "S2": "S'2",
    "S'2": "S2",
};

const historyBar = document.getElementById("history");
const history = Array();

export function resetHistory(){
    removeMove(history.length);
}

export function addMove(move){
    console.log("before add", history)

    const moveElement = document.createElement("p");
    moveElement.innerText = move;
    history.push(move);
    historyBar.appendChild(moveElement);

    console.log("after add", history)
}

export function removeMove(nb){
    console.log("before remove", history)

    for (let i = 0; i < nb; i++) {
        historyBar.removeChild(historyBar.lastChild)
        history.pop();
    }

    console.log("after remove", history)
}

export function checkForDouble(){
    console.log("before double", history)

    if (history.length > 1){
        const move = history[history.length - 1];
        const lastMove = history[history.length - 2];
        let newMove;
        console.log(lastMove, move, move === lastMove)
        if (move === lastMove){
            removeMove(2);          // remove duplicates
            newMove = `${move}2`;   // replace it with [move]2.
            addMove(newMove);       // e.g. F F -> F2
        }
    }

    console.log("after double", history)
}

export function checkForTriple(){
    console.log("before triple", history)

    if (history.length > 1){
        const move = history[history.length - 1];
        const lastMove = history[history.length - 2];
        const double = `${move}2`
        if (lastMove === double && opposite[move]){
            removeMove(2);             // replace by opposite: 
            addMove(opposite[move]);   // F2 F -> F'
        }
    }

    console.log("after triple", history)
}

export function checkForOpposite(){
    console.log("before opposite", history)

    if (history.length > 1){
        const move = history[history.length - 1];
        const lastMove = history[history.length - 2];
        if (lastMove === opposite[move]){
            removeMove(2)
        }
    }

    console.log("after opposite", history)
}
