import { getMoves } from "./movement";

export const checkForChecks = (allPieces, cb) => {
    const whitePieces = allPieces.filter(piece => piece.color === 'white');
    const blackPieces = allPieces.filter(piece => piece.color === 'black');

    whitePieces.forEach(piece => {
        const moves = getMoves(piece, [...allPieces]);
        moves.forEach(move => {
            const [newX, newY] = move;
            const newPosition = [newX, newY];
            const newPiece = allPieces.find(piece => piece.position.join(',') === newPosition.join(','));
            if (newPiece && newPiece.color === 'black') {
                if (newPiece.type === 'king') {
                    cb('black');
                }
            }
        })
    })

    blackPieces.forEach(piece => {
        const moves = getMoves(piece, [...allPieces]);
        moves.forEach(move => {
            const [newX, newY] = move;
            const newPosition = [newX, newY];
            const newPiece = allPieces.find(piece => piece.position.join(',') === newPosition.join(','));
            if (newPiece && newPiece.color === 'white') {
                if (newPiece.type === 'king') {
                    cb('white');
                }
            }
        })
    })    
}

export const checkDanger = (allPieces, oColor, positions = []) => {
    const enemyPieces = allPieces.filter(piece => piece.color === oColor && piece.type !== 'king');

    for(const enemyPiece of enemyPieces) {
        const moves = getMoves(enemyPiece, [...allPieces]);
        for(const move of moves) {
            const [newX, newY] = move;
            const newPosition = [newX, newY];
            
            if(positions.find((pos) => pos.join("") === newPosition.join(""))){
                return true;
            }
        }
    }
    return false
}


export const checkForMate = (allPieces, color) => {
    const oppColor = color === "white" ?  "black" : "white"
    const colorPieces = allPieces.filter(p => p.color === color)

    for(const piece of colorPieces) {
        const moves = getMoves(piece, [...allPieces]);

        for(const move of moves) {       
            const testPieces = [...allPieces]
            const dest = testPieces.find(item => item.position[0] === move[0] && item.position[1] === move[1])
            testPieces[dest.id] = {...testPieces[dest.id], color : testPieces[piece.id].color, type: testPieces[piece.id].type}
            testPieces[piece.id] = {...testPieces[piece.id], color: undefined, type: 'empty', moved: true}

            
            const oppPieces = testPieces.filter(p => p.color === oppColor)
            let stillCheck = false
            for(const oppPiece of oppPieces) {
                const oppMoves = getMoves(oppPiece, testPieces)
                for(const oppMove of oppMoves){
                    const [newY, newX] = oppMove;
                    const newPosition = [newY, newX];
                    const newPiece = testPieces.find(tPiece => tPiece.position.join(',') === newPosition.join(','));
                    if (newPiece && newPiece.color === color) {
                        if (newPiece.type === 'king') {
                            stillCheck = true
                        }
                    }
                }
            }
            if(!stillCheck){
                return false
            }
        }
    }

    return true
}

export const checkForStale = (allPieces, color) => {
    const oppColor = color === "white" ?  "black" : "white"
    const colorPieces = allPieces.filter(p => p.color === color && p.type !== "king")
    const king = allPieces.filter(p => p.color === color && p.type === "king")[0]

    for(const piece of colorPieces) {
        if(getMoves(piece, [...allPieces]).length > 0){
            return false
        }
    }

    const moves = getMoves(king, [...allPieces]);
    console.log({moves, color, king})

    for(const move of moves) {       
        const testPieces = [...allPieces]
        const dest = testPieces.find(item => item.position[0] === move[0] && item.position[1] === move[1])
        testPieces[dest.id] = {...testPieces[dest.id], color : testPieces[king.id].color, type: testPieces[king.id].type}
        testPieces[king.id] = {...testPieces[king.id], color: undefined, type: 'empty', moved: true}

        
        const oppPieces = testPieces.filter(p => p.color === oppColor)

        
        let stillCheck = false
        for(const oppPiece of oppPieces) {
            const oppMoves = getMoves(oppPiece, testPieces)
            for(const oppMove of oppMoves){
                const [newY, newX] = oppMove;
                const newPosition = [newY, newX];
                const newPiece = testPieces.find(tPiece => tPiece.position.join(',') === newPosition.join(','));
                if (newPiece && newPiece.color === color) {
                    if (newPiece.type === 'king') {
                        stillCheck = true
                    }
                }
            }
        }
        if(!stillCheck){
            return false
        }
    }
    return true
}