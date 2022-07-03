import { checkDanger } from "./check";

const checkLeft = (x, y, toY, allPieces) => {
    for(let i = y-1; i > toY; i--){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === i)
        if(obstacle.type !== 'empty'){
            return false;
        }
    }
    return true;
}

const checkRight = (x, y, toY, allPieces) => {
    for(let i = y+1; i < toY; i++){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === i)
        if(obstacle.type !== 'empty'){
            return false;
        }
    }
    return true;
}

// const checkUp = (x, y, toX, allPieces) => {
//     for(let i = x-1; i > toX; i--){
//         const obstacle = allPieces.find(piece => piece.position[0] === i && piece.position[1] === y)
//         if(obstacle.type !== 'empty'){
//             return false;
//         }
//     }
//     return true;
// }

// const checkDown = (x, y, toX, allPieces) => {
//     for(let i = x+1; i < toX; i++){
//         const obstacle = allPieces.find(piece => piece.position[0] === i && piece.position[1] === y)
//         if(obstacle.type !== 'empty'){
//             return false;
//         }
//     }
//     return true;
// }

// const checkTopLeft = (x, y, toX, toY, allPieces) => {
//     for(let i = x-1, j = y-1; i > toX && j > toY; i--, j--){
//         const obstacle = allPieces.find(piece => piece.position[0] === i && piece.position[1] === j)
//         if(obstacle.type !== 'empty'){
//             return false;
//         }
//     }
//     return true;
// }

// const checkTopRight = (x, y, toX, toY, allPieces) => {
//     for(let i = x-1, j = y+1; i > toX && j < toY; i--, j++){
//         const obstacle = allPieces.find(piece => piece.position[0] === i && piece.position[1] === j)
//         if(obstacle.type !== 'empty'){
//             return false;
//         }
//     }
//     return true;
// }

// const checkBottomLeft = (x, y, toX, toY, allPieces) => {
//     for(let i = x+1, j = y-1; i < toX && j > toY; i++, j--){
//         const obstacle = allPieces.find(piece => piece.position[0] === i && piece.position[1] === j)
//         if(obstacle.type !== 'empty'){
//             return false;
//         }
//     }
//     return true;
// }

// const checkBottomRight = (x, y, toX, toY, allPieces) => {
//     for(let i = x+1, j = y+1; i < toX && j < toY; i++, j++){
//         const obstacle = allPieces.find(piece => piece.position[0] === i && piece.position[1] === j)
//         if(obstacle.type !== 'empty'){
//             return false;
//         }
//     }
//     return true;
// }

const rightMoves = (from, color, allPieces) => {
    let x = from[0]
    const moves = [];
    for(let y = from[1]+1; y < 8; y++){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === y)
        if(obstacle.type !== 'empty'){
            if(obstacle.color !== color){
                moves.push([x, y]);
            }
            break
        }
        moves.push([x, y]);
    }
    return moves;
}

const leftMove = (from, color, allPieces) => {
    let x = from[0];
    const moves = [];
    for(let y = from[1]-1; y >= 0; y--){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === y)
        if(obstacle.type !== 'empty'){
            if(obstacle.color !== color){
                moves.push([x, y]);
            }
            break
        }
        moves.push([x, y]);
    }
    return moves;
}

const topMoves = (from, color, allPieces) => {
    let y = from[1];
    const moves = [];
    for(let x = from[0]-1; x >= 0; x--){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === y)
        if(obstacle.type !== 'empty'){
            if(obstacle.color !== color){
                moves.push([x, y]);
            }
            break
        }
        moves.push([x, y]);
    }
    return moves;
}

const bottomMoves = (from, color, allPieces) => {
    let y = from[1];
    const moves = [];
    for(let x = from[0]+1; x < 8; x++){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === y)
        if(obstacle.type !== 'empty'){
            if(obstacle.color !== color){
                moves.push([x, y]);
            }
            break
        }
        moves.push([x, y]);
    }
    return moves;
}

const topRightMoves = (from, color, allPieces) => {
    const moves = [];
    for(let x = from[0]-1, y = from[1]+1; x >= 0 && y < 8; x--, y++){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === y)
        if(obstacle.type !== 'empty'){
            if(obstacle.color !== color){
                moves.push([x, y]);
            }
            break
        }
        moves.push([x, y]);
    }
    return moves;
}

const topLeftMoves = (from, color, allPieces) => {
    const moves = [];
    for(let x = from[0]-1, y = from[1]-1; x >= 0 && y >= 0; x--, y--){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === y)
        if(obstacle.type !== 'empty'){
            if(obstacle.color !== color){
                moves.push([x, y]);
            }
            break
        }
        moves.push([x, y]);
    }
    return moves;
}

const bottomRightMoves = (from, color, allPieces) => {
    const moves = [];
    for(let x = from[0]+1, y = from[1]+1; x < 8 && y < 8; x++, y++){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === y)
        if(obstacle.type !== 'empty'){
            if(obstacle.color !== color){
                moves.push([x, y]);
            }
            break
        }
        moves.push([x, y]);
    }
    return moves;
}

const bottomLeftMoves = (from, color, allPieces) => {
    const moves = [];
    for(let x = from[0]+1, y = from[1]-1; x < 8 && y >= 0; x++, y--){
        const obstacle = allPieces.find(piece => piece.position[0] === x && piece.position[1] === y)
        if(obstacle.type !== 'empty'){
            if(obstacle.color !== color){
                moves.push([x, y]);
            }
            break
        }
        moves.push([x, y]);
    }
    return moves;
}

const knightMoves = (from, color, allPieces) => {
    let [x, y] = from
    const moves = []
    let pX = [-2, -1, 1, 2]
    let pY = [-2, -1, 1, 2]

    for(let i = 0; i < pX.length; i++){
        for(let j = 0; j < pY.length; j++){
            if(Math.abs(pX[i])  + Math.abs(pY[j]) === 3){
                let [newX, newY] = [x+pX[i], y+pY[j]]
                if(newX >= 0 && newY >= 0 && newX <= 7 && newY <=7){
                    const obstacle = allPieces.find(piece => piece.position[0] === newX && piece.position[1] === newY)
                    if(obstacle.color !== color){
                        moves.push([newX, newY]);
                    }
                }
            }
        }
    }
    return moves
}

const kingMoves = (from, color, allPieces, ready) => {
    let [x, y] = from
    const oColor = color === 'white' ? 'black' : 'white'
    const moves = []
    let pX = [-1, 0, 1]
    let pY = [-1, 0, 1]
    let yR = y+2
    let yL = y-2

    //castle
    if(yR <= 7 && checkRight(x, y, yR+1, allPieces)
        && !allPieces.find(item => item.position[0] === x && item.position[1] === yR+1).moved
        && !allPieces.find(item => item.position[0] === x && item.position[1] === y).moved){

        if(!checkDanger(allPieces, oColor, [[x, y], [x, y+1], [x, y+2]])){
            if(ready){
                const rook = allPieces.find(item => item.position[0] === x && item.position[1] === yR+1)
                const space = allPieces.find(item => item.position[0] === x && item.position[1] === y+1)
                allPieces[space.id] = {...allPieces[space.id], color : rook.color, type: rook.type}
                allPieces[rook.id] = {...allPieces[rook.id], color: undefined, type: 'empty', moved: true}
            }
            moves.push([x, yR])
        }
    }

    //castle
    if(yL >= 0 && checkLeft(x, y, yL-2, allPieces)
        && !allPieces.find(item => item.position[0] === x && item.position[1] === yL-2).moved
        && !allPieces.find(item => item.position[0] === x && item.position[1] === y).moved){

        if(!checkDanger(allPieces, oColor, [[x, y], [x, y-1], [x, y-2]])){
            if(ready){
                const rook = allPieces.find(item => item.position[0] === x && item.position[1] === yL-2)
                const space = allPieces.find(item => item.position[0] === x && item.position[1] === y-1)
                allPieces[space.id] = {...allPieces[space.id], color : rook.color, type: rook.type}
                allPieces[rook.id] = {...allPieces[rook.id], color: undefined, type: 'empty', moved: true}
            }
            moves.push([x, yL])
        }
    }



    for(let i = 0; i < pX.length; i++){
        for(let j = 0; j < pY.length; j++){
            if(pX[i] !== 0 || pY[j] !== 0){
                let [newX, newY] = [x+pX[i], y+pY[j]]
                if(newX >= 0 && newY >= 0 && newX <= 7 && newY <=7){
                    const obstacle = allPieces.find(piece => piece.position[0] === newX && piece.position[1] === newY)
                    if(obstacle.color !== color){
                        moves.push([newX, newY]);
                    }
                }
            }
        }
    }
    return moves
}

const pawnMoves = (from, color, allPieces, lastmove, ready) => {
    let [x, y] = from
    const moves = []
    const oColor = color === "white" ? "black" : "white"

    const osForward = color === "white" ? [x-1, y] : [x+1, y]
    const tsForward = color === "white" ? [x-2, y] : [x+2, y]
    const cpRight = color === "white" ? [x-1, y+1] : [x+1, y+1]
    const cpLeft = color === "white" ? [x-1, y-1] : [x+1, y-1]
    const initPos = color === "white" ? 6 : 1

    let obstacle = allPieces.find(piece => piece.position[0] === osForward[0] && piece.position[1] === y)
    if(obstacle.type === 'empty'){
        moves.push(osForward);
    }

    if(y+1 <= 7){
        obstacle = allPieces.find(piece => piece.position[0] === cpRight[0] && piece.position[1] === y+1)
        if(obstacle.color === oColor){
            moves.push(cpRight);
        }
    }

    if(y-1 >= 0){
        obstacle = allPieces.find(piece => piece.position[0] === cpLeft[0] && piece.position[1] === y-1)
        if(obstacle.color === oColor){
            moves.push(cpLeft);
        }
    }

    if(x === initPos){
        if(allPieces.find(piece => piece.position[0] === osForward[0] && piece.position[1] === y).type === "empty" && 
        allPieces.find(piece => piece.position[0] === tsForward[0] && piece.position[1] === y).type === "empty"){
            moves.push(tsForward)
        }
    }

    //enpassant
    if(lastmove && lastmove.type === "pawn" && lastmove.span === 2 && lastmove.color === oColor){
        if(lastmove.position[1] === y+1 && lastmove.position[0] === x){
            if(!moves.find((move) => move.join("") === cpRight.join(""))){
                if(ready){
                    const oPawn = allPieces.find(item => item.position.join("") === lastmove.position.join(""))
                    allPieces[oPawn.id] = {...allPieces[oPawn.id], color: undefined, type: 'empty', moved: true}
                }
                moves.push(cpRight);
            }
        }
        if(lastmove.position[1] === y-1 && lastmove.position[0] === x){
            if(!moves.find((move) => move.join("") === cpLeft.join(""))){
                if(ready){
                    const oPawn = allPieces.find(item => item.position.join("") === lastmove.position.join(""))
                    allPieces[oPawn.id] = {...allPieces[oPawn.id], color: undefined, type: 'empty', moved: true}
                }
                moves.push(cpLeft)
            }
        }
    }
    return moves
}

export const getMoves = (piece, allPieces, lastmove, ready) => {
    let moves = []
    switch (piece.type) {
        case 'rook':
            moves = [...rightMoves(piece.position, piece.color, allPieces), ...leftMove(piece.position, piece.color, allPieces),
                 ...topMoves(piece.position, piece.color, allPieces), ...bottomMoves(piece.position, piece.color, allPieces)];
            break
        case 'bishop':
            moves = [...topRightMoves(piece.position, piece.color, allPieces), ...topLeftMoves(piece.position, piece.color, allPieces),
                 ...bottomRightMoves(piece.position, piece.color, allPieces), ...bottomLeftMoves(piece.position, piece.color, allPieces)];
            break
        case 'queen':
            moves = [...rightMoves(piece.position, piece.color, allPieces), ...leftMove(piece.position, piece.color, allPieces), 
                ...topMoves(piece.position, piece.color, allPieces), ...bottomMoves(piece.position, piece.color, allPieces), 
                ...topRightMoves(piece.position, piece.color, allPieces), ...topLeftMoves(piece.position, piece.color, allPieces), 
                ...bottomRightMoves(piece.position, piece.color, allPieces), ...bottomLeftMoves(piece.position, piece.color, allPieces)];
            break
        case 'king':
            moves = kingMoves(piece.position, piece.color, allPieces, ready)
            break
        case 'pawn':
            moves = pawnMoves(piece.position, piece.color, allPieces, lastmove, ready)
            break
        case 'knight':
            moves = knightMoves(piece.position, piece.color, allPieces)
            break
        default:
            break;
    }
    return moves
}


// const screenStraightMove = (from, to, allPieces) => {
//     const [fromX, fromY] = from;
//     const [toX, toY] = to;
//     const xDiff = toX - fromX;
//     const yDiff = toY - fromY;
//     console.log({xDiff, yDiff})

//     if(yDiff < 0){
//         console.log("checking left")
//         return checkLeft(fromX, fromY, toY, allPieces);
//     }
//     else if(yDiff > 0){
//         console.log("checking right")
//         return checkRight(fromX, fromY, toY, allPieces);
//     }
//     else if(xDiff < 0){
//         console.log("checking up")
//         return checkUp(fromX, fromY, toX, allPieces);
//     }
//     console.log("checking down")
//     return checkDown(fromX, fromY, toX, allPieces);
// }

// const screenDiagonalMove = (from, to, allPieces) => {
//     const [fromX, fromY] = from;
//     const [toX, toY] = to;
//     const xDiff = toX - fromX;
//     const yDiff = toY - fromY;

//     if(xDiff < 0 && yDiff < 0){
//         return checkTopLeft(fromX, fromY, toX, toY, allPieces);
//     }
//     else if(xDiff < 0 && yDiff > 0){
//         return checkTopRight(fromX, fromY, toX, toY, allPieces);
//     }
//     else if(xDiff > 0 && yDiff < 0){
//         return checkBottomLeft(fromX, fromY, toX, toY, allPieces);
//     }
//     return checkBottomRight(fromX, fromY, toX, toY, allPieces);
// }


// const pawnMove = (piece, from, to, allPieces, lastmove) => {
//     const [fromRow, fromCol] = from;
//     const [toRow, toCol] = to;

//     const rowDiff = toRow - fromRow;
//     const colDiff = toCol - fromCol;

//     if(piece === "black") {
//         if(rowDiff === 1 && colDiff === 0) {
//             const obstacle = allPieces.find(piece => piece.position[0] === toRow && piece.position[1] === toCol);
//             if(obstacle.type !== 'empty') {
//                 return false;
//             }
//             return true;
//         }
//         else if(rowDiff === 2 && colDiff === 0 && fromRow === 1) {
//             const obstacle = allPieces.find(piece => piece.position[0] === fromRow+1 && piece.position[1] === fromCol);
//             if(obstacle.type !== 'empty') {
//                 return false;
//             }
//             return true;
//         }
//         //enpassant
//         else if(rowDiff === 1 && colDiff === 1) {
//             const pieceToCapture = allPieces.find(piece => piece.position[0] === toRow && piece.position[1] === toCol);
//             if(pieceToCapture && pieceToCapture.color === "white") {
//                 return true;
//             }
             
        
//             if(lastmove && lastmove.type === "pawn" && lastmove.span === 2 && lastmove.color !== piece){
//                 if(lastmove.position[1] === fromCol+1){
//                     const pawn = allPieces.find(item => item.position[0] === lastmove.position[0] && item.position[1] === lastmove.position[1])
//                     allPieces[pawn.id] = {...allPieces[pawn.id], color: undefined, type: 'empty', moved: true}
//                     return true
//                 }
//             }
//         }
//         else if(rowDiff === 1 && colDiff === -1) {
//             const pieceToCapture = allPieces.find(piece => piece.position[0] === toRow && piece.position[1] === toCol);
//             if(pieceToCapture && pieceToCapture.color === "white") {
//                 return true;
//             }

//             if(lastmove && lastmove.type === "pawn" && lastmove.span === 2 && lastmove.color !== piece){
//                 if(lastmove.position[1] === fromCol-1){
//                     const pawn = allPieces.find(item => item.position[0] === lastmove.position[0] && item.position[1] === lastmove.position[1])
//                     allPieces[pawn.id] = {...allPieces[pawn.id], color: undefined, type: 'empty', moved: true}
//                     return true
//                 }
//             }
//         } 
//     }
//     else if(piece === "white") {
//         if(rowDiff === -1 && colDiff === 0) {
//             const obstacle = allPieces.find(piece => piece.position[0] === toRow && piece.position[1] === toCol);
//             if(obstacle.type !== 'empty') {
//                 return false;
//             }
//             return true;
//         }
//         else if(rowDiff === -2 && colDiff === 0 && fromRow === 6) {
//             const obstacle = allPieces.find(piece => piece.position[0] === fromRow-1 && piece.position[1] === toCol);
//             if(obstacle.type !== 'empty') {
//                 return false;
//             }
//             return true;
//         }
//         //enpassant
//         else if(rowDiff === -1 && colDiff === 1) {
//             const pieceToCapture = allPieces.find(piece => piece.position[0] === toRow && piece.position[1] === toCol);
//             if(pieceToCapture && pieceToCapture.color === "black") {
//                 return true;
//             }

//             if(lastmove && lastmove.type === "pawn" && lastmove.span === 2 && lastmove.color !== piece){
//                 if(lastmove.position[1] === fromCol+1){
//                     const pawn = allPieces.find(item => item.position[0] === lastmove.position[0] && item.position[1] === lastmove.position[1])
//                     allPieces[pawn.id] = {...allPieces[pawn.id], color: undefined, type: 'empty', moved: true}
//                     return true
//                 }
//             }
//         }
//         else if(rowDiff === -1 && colDiff === -1) {
//             const pieceToCapture = allPieces.find(piece => piece.position[0] === toRow && piece.position[1] === toCol);
//             if(pieceToCapture && pieceToCapture.color === "black") {
//                 return true;
//             }

//             if(lastmove && lastmove.type === "pawn" && lastmove.span === 2 && lastmove.color !== piece){
//                 if(lastmove.position[1] === fromCol-1){
//                     const pawn = allPieces.find(item => item.position[0] === lastmove.position[0] && item.position[1] === lastmove.position[1])
//                     allPieces[pawn.id] = {...allPieces[pawn.id], color: undefined, type: 'empty', moved: true}
//                     return true
//                 }
//             }
//         }
//     }
//     return false;
// }

// const kingMove = (piece, from, to, allPieces) => {
//     const [fromRow, fromCol] = from;
//     const [toRow, toCol] = to;

//     const rowDiff = toRow - fromRow;
//     const colDiff = toCol - fromCol;

//     if(rowDiff <= 1 && rowDiff >= -1 && colDiff <= 1 && colDiff >= -1) {
//         return true;
//     }

//     let cond1 = false
//     let cond2 = false
//     let cond3 = false
//     if(colDiff === 2 && rowDiff === 0){
//         cond1 = checkRight(fromRow, fromCol, toCol+1, allPieces)
//         cond2 = !allPieces.find(item => item.position[0] === fromRow && item.position[1] === toCol+1).moved
//         cond3 = !allPieces.find(item => item.position[0] === fromRow && item.position[1] === fromCol).moved
//         if(cond1 && cond2 && cond3){
//             const rook = allPieces.find(item => item.position[0] === fromRow && item.position[1] === toCol+1)
//             const space = allPieces.find(item => item.position[0] === fromRow && item.position[1] === fromCol+1)
//             allPieces[space.id] = {...allPieces[space.id], color : rook.color, type: rook.type}
//             allPieces[rook.id] = {...allPieces[rook.id], color: undefined, type: 'empty', moved: true}
//             return true
//         }
//     }
//     if(colDiff === -2 && rowDiff === 0){
//         cond1 = checkLeft(fromRow, fromCol, toCol-2, allPieces)
//         cond2 = !allPieces.find(item => item.position[0] === fromRow && item.position[1] === toCol-2).moved
//         cond3 = !allPieces.find(item => item.position[0] === fromRow && item.position[1] === fromCol).moved
//         if(cond1 && cond2 && cond3){
//             const rook = allPieces.find(item => item.position[0] === fromRow && item.position[1] === toCol-2)
//             const space = allPieces.find(item => item.position[0] === fromRow && item.position[1] === fromCol-1)
//             allPieces[space.id] = {...allPieces[space.id], color : rook.color, type: rook.type}
//             allPieces[rook.id] = {...allPieces[rook.id], color: undefined, type: 'empty', moved: true}
//             return true
//         }
//     }
//     return false;
// }

// const queenMove = (piece, from, to, allPieces) => {
//     const [fromRow, fromCol] = from;
//     const [toRow, toCol] = to;

//     const rowDiff = toRow - fromRow;
//     const colDiff = toCol - fromCol;

//     if(rowDiff === 0 || colDiff === 0) {
//         if(!screenStraightMove(from, to, allPieces)) {
//             return false;
//         }
//     }
//     else if(Math.abs(rowDiff) === Math.abs(colDiff)) {
//         if(!screenDiagonalMove(from, to, allPieces)) {
//             return false;
//         }
//     }

//     if(Math.abs(rowDiff) > 0 && Math.abs(colDiff) === 0) {
//         return true;
//     }
//     else if(Math.abs(rowDiff) === 0 && Math.abs(colDiff) > 0) {
//         return true;
//     }
//     else if(Math.abs(rowDiff) === Math.abs(colDiff)) {
//         return true;
//     }
//     return false;
// }

// const rookMove = (piece, from, to, allPieces) => {
//     const [fromRow, fromCol] = from;
//     const [toRow, toCol] = to;
    
//     const rowDiff = toRow - fromRow;
//     const colDiff = toCol - fromCol;

//     if(!screenStraightMove(from, to, allPieces)) {
//         return false;
//     }

//     if(Math.abs(rowDiff) > 0 && Math.abs(colDiff) === 0) {
//         return true;
//     }
//     else if(Math.abs(rowDiff) === 0 && Math.abs(colDiff) > 0) {
//         return true;
//     }
//     return false;
// }

// const bishopMove = (piece, from, to, allPieces) => {
//     const [fromRow, fromCol] = from;
//     const [toRow, toCol] = to;

//     const rowDiff = toRow - fromRow;
//     const colDiff = toCol - fromCol;

//     if(!screenDiagonalMove(from, to, allPieces)) {
//         return false;
//     }

//     if(Math.abs(rowDiff) === Math.abs(colDiff)) {
//         return true;
//     }
//     return false;
// }

// const knightMove = (piece, from, to, allPieces) => {
//     const [fromRow, fromCol] = from;
//     const [toRow, toCol] = to;

//     const rowDiff = toRow - fromRow;
//     const colDiff = toCol - fromCol;

//     if(Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) {
//         return true;
//     }
//     else if(Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2) {
//         return true;
//     }
//     return false;
// }


export const move = (piece, to, allPieces, lastmove) => {
    const pieceMoves = getMoves(piece, allPieces, lastmove, true)
    return pieceMoves.find((move) => move.join("") === to.join(""))
}