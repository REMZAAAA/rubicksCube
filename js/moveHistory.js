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

    "u": "u'",
    "u'": "u",
    "u2": "u'2",
    "u'2": "u2",
    
    "d": "d'",
    "d'": "d",
    "d2": "d'2",
    "d'2": "d2",
    
    "r": "r'",
    "r'": "r",
    "r2": "r'2",
    "r'2": "r2",
    
    "l": "l'",
    "l'": "l",
    "l2": "l'2",
    "l'2": "l2",
    
    "f": "f'",
    "f'": "f",
    "f2": "f'2",
    "f'2": "f2",
    
    "b": "b'",
    "b'": "b",
    "b2": "b'2",
    "b'2": "b2",

    "x": "x'",
    "x'": "x",
    "x2": "x'2",
    "x'2": "x2",
    
    "y": "y'",
    "y'": "y",
    "y2": "y'2",
    "y'2": "y2",
    
    "z": "z'",
    "z'": "z",
    "z2": "z'2",
    "z'2": "z2",
};

const historyBar = document.getElementById("history");
const history = Array();

export function resetHistory(){
    removeMove(history.length);
}

export function addMove(move){
    const moveElement = document.createElement("p");
    moveElement.innerText = move;
    history.push(move);
    historyBar.appendChild(moveElement);
}

export function removeMove(nb){
    for (let i = 0; i < nb; i++) {
        historyBar.removeChild(historyBar.lastChild)
        history.pop();
    }
}

export function checkForDouble(){
    if (history.length > 1){
        const move = history[history.length - 1];
        const lastMove = history[history.length - 2];
        let newMove;
        if (move === lastMove){
            removeMove(2);          // remove duplicates,
            newMove = `${move}2`;   // replace it with [move]2.
            addMove(newMove);       // e.g. F F -> F2
        }else if (lastMove == `${opposite[move]}2`){
            removeMove(2);
            addMove(opposite[move])
        }
    }
}

export function checkForTriple(){
    if (history.length > 1){
        const move = history[history.length - 1];
        const lastMove = history[history.length - 2];
        const double = `${move}2`
        if (lastMove === double && opposite[move]){
            removeMove(2);             // replace by opposite: 
            addMove(opposite[move]);   // F2 F -> F'
        }
    }
}

export function checkForOpposite(){
    if (history.length > 1){
        const move = history[history.length - 1];
        const lastMove = history[history.length - 2];
        if (lastMove === opposite[move]){
            removeMove(2)
        }
    }
}
