// Maps every move to its inverse.
// Used to simplify move history by detecting
// cancellations and equivalent move sequences.
//
// Examples:
// F  <-> F'
// F2 <-> F'2
// x  <-> x'
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

export function resetHistory(history, panel){
    // Remove every move from both the UI
    // and the internal history array.
    removeMove(history, history.length, panel);
}

export function addMove(history, move, panel){
    // Add a move to the history array
    history.push(move);
    // and display it in the history panel.
    if (panel){
        const moveElement = document.createElement("p");
        moveElement.innerText = move;
        panel.appendChild(moveElement);
    }
    
    checkForDouble(history, panel)
    checkForTriple(history, panel)
    checkForOpposite(history, panel)
}

export function removeMove(history, N, panel){
    // Remove the last N moves from both
    // the history array and the DOM.
    for (let i = 0; i < N; i++) {
        history.pop();
        if (panel){
            panel.removeChild(panel.lastChild)
        }
    }
}

export function checkForDouble(history, panel){
    // Simplifies consecutive identical moves.
    //
    // Examples:
    // F F     -> F2
    // F2 F2   -> nothing
    // F'2 F   -> F'
    //
    // Called after adding a new move.
    if (history.length > 1){
        const move = history[history.length - 1];
        const lastMove = history[history.length - 2];
        let newMove;

        // F F -> F2    
        if (move === lastMove && move[move.length - 1] !== '2'){
            newMove = `${move}2`;
            removeMove(history, 2, panel);
            addMove(history, newMove, panel);
        // F'2 F -> F'
        }else if (lastMove == `${opposite[move]}2`){
            removeMove(history, 2, panel);
            addMove(history, opposite[move], panel)
        // F F2 -> F'
        }else if (move === `${lastMove}2`){
            removeMove(history, 2, panel);
            addMove(history, opposite[lastMove], panel)
        // F2 F2 -> ∅
        }else if (move === lastMove && move[move.length - 1] === '2'){
            removeMove(history, 2, panel);
        }
    }
}

export function checkForTriple(history, panel){
    // Simplifies sequences of three identical turns.
    //
    // Example:
    // F2 F -> F'
    //
    // Equivalent to three quarter turns
    // in the same direction.
    if (history.length > 1){
        const move = history[history.length - 1];
        const lastMove = history[history.length - 2];
        const double = `${move}2`

        if (lastMove === double && opposite[move]){
            removeMove(history, 2, panel);
            addMove(history, opposite[move], panel);
        }
    }
}

export function checkForOpposite(history, panel){
    // Cancels opposite consecutive moves.
    //
    // Examples:
    // F F' -> ∅
    // R' R -> ∅
    // x x' -> ∅
    if (history.length > 1){
        const move = history[history.length - 1];
        const lastMove = history[history.length - 2];
        if (lastMove === opposite[move]){
            removeMove(history, 2, panel)
        }
    }
}

export const moves = {
    "F": "frontLayer 1 1",
    "B": "backLayer -1 1",
    "L": "leftLayer -1 1",
    "R": "rightLayer 1 1",
    "U": "upperLayer -1 1",
    "D": "downLayer 1 1",
    "M": "middleLayer -1 1",
    "E": "equatorLayer 1 1",
    "S": "standingLayer 1 1",

    "F'": "frontLayer -1 1",
    "B'": "backLayer 1 1",
    "L'": "leftLayer 1 1",
    "R'": "rightLayer -1 1",
    "U'": "upperLayer 1 1",
    "D'": "downLayer -1 1",
    "M'": "middleLayer 1 1",
    "E'": "equatorLayer -1 1",
    "S'": "standingLayer -1 1",

    "x": "rightLayer middleLayer leftLayer 1 1 1 1 1 1",
    "y": "upperLayer equatorLayer downLayer -1 -1 -1 1 1 1",
    "z": "frontLayer standingLayer backLayer 1 1 1 1 1 1",

    "x'": "rightLayer middleLayer leftLayer -1 -1 -1 1 1 1",
    "y'": "upperLayer equatorLayer downLayer 1 1 1 1 1 1",
    "z'": "frontLayer standingLayer backLayer -1 -1 -1 1 1 1",

    "u": "upperLayer equatorLayer -1 -1 1 1",
    "d": "downLayer equatorLayer 1 1 1 1",
    "r": "rightLayer middleLayer 1 1 1 1",
    "l": "leftLayer middleLayer -1 -1 1 1",
    "f": "frontLayer standingLayer 1 1 1 1",
    "b": "backLayer standingLayer -1 -1 1 1",
    
    "u'": "upperLayer equatorLayer 1 1 1 1",
    "d'": "downLayer equatorLayer -1 -1 1 1",
    "r'": "rightLayer middleLayer -1 -1 1 1",
    "l'": "leftLayer middleLayer 1 1 1 1",
    "f'": "frontLayer standingLayer -1 -1 1 1",
    "b'": "backLayer standingLayer 1 1 1 1",

    "F2": "frontLayer 1 2",
    "B2": "backLayer -1 2",
    "L2": "leftLayer -1 2",
    "R2": "rightLayer 1 2",
    "U2": "upperLayer -1 2",
    "D2": "downLayer 1 2",
    "M2": "middleLayer -1 2",
    "E2": "equatorLayer 1 2",
    "S2": "standingLayer 1 2",
}

export function getMoveParameters(move){
    const content = moves[move].split(" ")
    const separator = (content.length / 3);
    // Extract:
    // - layer names,
    // - directions,
    // - number of quarter turns.
    return [content.slice(0, separator), content.slice(separator, separator * 2), content.slice(separator * 2, content.length)]
}
