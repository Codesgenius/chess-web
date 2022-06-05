import React, {useState, useRef} from 'react'
import {FaForward, FaBackward, FaPlay} from 'react-icons/fa'
import Piece from './components/Piece'
import useClickOutside from './hooks/useClickOutside'
import './style.css'
import { squares, pieces as allPieces } from './utils/pieces'

const Chess = () => {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setSelected(null));

  const [rotate, setRotate] = useState(false)
  const [player, setPlayer] = useState('white')
  const [selected, setSelected] = useState(null)
  const [prev, setPrev] = useState(null)
  const [pieces, setPieces] = useState(allPieces)
  const [curr, setCurr] = useState(null)
  const [checkColor, setCheckColor] = useState(null)
  const [sugmoves, setSugmoves] = useState([])
  const [lastmove, setLastmove] = useState(null)
  const [allmoves, setAllmoves] = useState([allPieces])

  console.log(rotate)

  const states = {selected, setSelected, player, setPlayer, allmoves, setAllmoves, lastmove, setLastmove,
    pieces, setPieces, prev, setPrev, curr, setCurr, checkColor, setCheckColor, sugmoves, setSugmoves, rotate}

  return (
    <div className='wrapper'>

     <div className="left-pane">
     <div className="player-con">
        <h1 className="player-name">{player} to play</h1>
      </div>

      <div className="info-container">
        <div className="info-con" onClick={() => {
          setPieces(allPieces)
          setPlayer('white')
          setCurr(null)
          setPrev(null)
          setSelected(null)
          setCheckColor(null)
          setAllmoves([allPieces])
          setLastmove(null)
          setSugmoves([])
          }}>
          <h2>Restart</h2>
        </div>

        <div className="rotate" onClick={() => {setRotate(!rotate)}}>
          <h2>Rotate</h2>
        </div>

        <div className="np">
          <FaBackward  className='fb'/> <FaPlay className='play'/>  <FaForward className='fb' />
        </div>
      </div>
      <div className="player-con">
        <h1 className="player-name">Human VS Human</h1>
        <p style={{ color: "blue" }}><a href="#">Play with Computer?</a></p>
      </div>
     </div>
      <div className={`main-container ${rotate ? 'rotate-con' : ''}`}>
        <div ref={wrapperRef} className="grid-container">
              {squares.map((item, index) => (
                <div key={index} className={`grid-item ${item.type}`}>
                  <Piece item={pieces[index]}
                    {...states}/>
                </div>
              ))}
          </div>
      </div>
    </div>
  )
}

export default Chess