import React from 'react'
import {FaChessRook, FaChessBishop, FaChessKing, FaChessKnight, FaChessPawn, FaChessQueen} from 'react-icons/fa'
import {getMoves, move} from '../utils/movement'
import { checkForChecks, checkForMate, checkForStale } from '../utils/check'

const Piece = ({item, player, setPlayer, selected, setSelected, prev, setPrev, pieces, setPieces, sugmoves, setSugmoves,
     curr, setCurr, setCheckColor, checkColor, allmoves, setAllmoves, lastmove, setLastmove, rotate}) => {
    const {id, type, color, position} = item

    const renderIcon = () => {
        switch (type) {
            case 'rook':
                return <FaChessRook color={color} />
            case 'bishop':
                return <FaChessBishop color={color} />
            case 'king':
                return <FaChessKing color={color} />
            case 'knight':
                return <FaChessKnight color={color} />
            case 'pawn':
                return <FaChessPawn color={color} />
            case 'queen':
                return <FaChessQueen color={color} />
            default:
                return null
        }
    }

    const handleClick = () => {
        if(color === player){
            setSugmoves(getMoves(item, pieces))
        }
        if(selected !== null) {
            if(color !== player) {
                const curItem = pieces[selected]
                let newPieces = [...pieces]
                let oldPieces = [...pieces]
                let oldPlayer = player
                let oldCheck = checkColor

                if(move(curItem.type, curItem.color, curItem.position, pieces[id].position, newPieces, lastmove)) {
                    newPieces[id] = {...newPieces[id], color : newPieces[selected].color, type: newPieces[selected].type}
                    newPieces[selected] = {...newPieces[selected], color: undefined, type: 'empty', moved: true}

                    setPieces(newPieces)
                    setSelected(null)
                    setCurr(id)
                    setPrev(selected)
                    setPlayer(player === 'white' ? 'black' : 'white')
                    setCheckColor(null)

                    checkForChecks(newPieces, (checkColor) => {
                        setCheckColor(checkColor)
                        if(checkColor === player) {
                            setCheckColor(oldCheck)
                            setPieces(oldPieces)
                            setPlayer(oldPlayer)
                            setSelected(null)
                            setPrev(null)
                            setCurr(null)
                        }

                        if(checkColor){
                            if(checkForMate(newPieces, checkColor)){
                                setTimeout(()=> {
                                    alert(`Checkmate for ${checkColor === 'white' ? 'black' : 'white'}`)
                                }, 100)
                            }
                        }
                    })

                    if(checkForStale(newPieces, player === 'white' ? 'black' : 'white')){
                        setTimeout(()=> {
                            alert("Stalemate")
                        }, 100)
                    }

                    setSugmoves([])
                    setLastmove({
                        ...newPieces[id],
                        span: Math.abs(position[0] - newPieces[selected].position[0]),

                    })
                    // setAllmoves([...allmoves, newPieces])
                    return
                }
                return console.log("invalid move")
            }
        }

        if(color && player === color) {
            setSelected(id)
        }
        setPrev(null)
        setCurr(null)
    }

  return (
    <div className={`piece-con ${selected === id ? 'selected-con' : ''} ${rotate ? 'rotate-con' : ''}
     ${sugmoves.find(sug => sug[0] === position[0] && sug[1] === position[1]) ? 'sug-con' : ''} ${prev === id ? 'prev-con' : ''} 
     ${curr === id ? 'curr-con' : ''} ${(checkColor === color && type === 'king') ? 'check-con' : ''} `} 
    onClick={() => handleClick()}>
        {renderIcon()}
    </div>
  )
}

export default Piece