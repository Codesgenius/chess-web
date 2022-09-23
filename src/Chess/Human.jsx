import React, {useState, useRef, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import Analysis from './Analysis'
import Modal from './components/Modal'
import Piece from './components/HumanPiece'
import useClickOutside from './hooks/useClickOutside'
import { squares, pieces as allPieces } from './utils/pieces'
import { checkForChecks, checkForMate, checkForStale } from './utils/check'
import { VscChromeClose } from "react-icons/vsc";
import { BiRotateRight } from "react-icons/bi";
import {GiChessKnight} from 'react-icons/gi'

const Human = ({socket}) => {
  const location = useLocation()
  const {user} = location.state
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setSelected(null));

  const [mode, setMode] = useState('human')
  // const [searchHuman, setSearchHuman] = useState('search')
  const [myres, setMyres] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [crown, setCrown] = useState(null)
  const [rotate, setRotate] = useState(user.color === "black")
  const [player, setPlayer] = useState("white")
  const [toplay, setToplay] = useState(user.color === "white")
  const [selected, setSelected] = useState(null)
  const [prev, setPrev] = useState(null)
  const [pieces, setPieces] = useState(allPieces)
  const [curr, setCurr] = useState(null)
  const [checkColor, setCheckColor] = useState(null)
  // const [gamestat, setGamestat] = useState(null)
  const [sugmoves, setSugmoves] = useState([])
  const [lastmove, setLastmove] = useState(null)
  const [gameover, setGameover] = useState(false)
  const [isAOpen, setIsAOpen] = useState(false)
  const [allmoves, setAllmoves] = useState([{state: allPieces, analysis: {checkColor, prev, curr}}])

  useEffect(() => {
    socket.on("played", ({pieces}) => {
        setPieces(pieces)
        setToplay(true)
        setPlayer(user.color)
        setCheckColor(null)

        const newPieces = [...pieces]
        let newCheckColor = null
        checkForChecks(newPieces, (checkColor) => {
            newCheckColor = checkColor
            setCheckColor(checkColor)

            if(checkColor){
                if(checkForMate(newPieces, checkColor)){
                  // setGameover(true)
                  // setGamestat("checkmate")
                  console.log(`Checkmate for ${checkColor === 'white' ? 'black' : 'white'}`)
                }
            }
        })

        if(checkForStale(newPieces, user.color === 'white' ? 'black' : 'white')){
          // setGameover(true)
          // setGamestat("Stalemate")
          console.log("Stalemate")
        }

        setAllmoves([...allmoves, {state: pieces, analysis: {checkColor: newCheckColor, prev, curr}}])
    })
  }, [setPieces, setPlayer, setToplay,setAllmoves, setCheckColor, setGameover, allmoves, checkColor, prev, curr, gameover, socket, user.color])

  const states = {selected, setSelected, player, setPlayer, allmoves, setAllmoves, lastmove,toplay, setToplay, setLastmove, setIsOpen, myres, setMyres, gameover, setGameover,
    pieces, setPieces, prev, setPrev, curr, setCurr, checkColor, setCheckColor, sugmoves, setSugmoves, rotate, crown, setCrown, socket, room: user.room, sender: user.name}
  const modalStates = {isOpen, setIsOpen, crown, setCrown, myres, setMyres, pieces, setPieces,
    setSelected, setCurr, setPrev, setPlayer, setCheckColor, setSugmoves, setLastmove, player, checkColor}
  const analysisStates = {isAOpen, setIsAOpen, allmoves}


  return (
    <div className='wrapper'>
      <Modal {...modalStates}/>
      <Analysis {...analysisStates} states={states} />

      <div className="floating-logo">
      <div className="logo">
          <h2>
            <GiChessKnight /> Chess World
          </h2>
          <i>@_chessworld</i>
        </div>
      </div>
      

     <div className="left-pane">
      {/* <div className="player-con">
          <h1 className="player-name">{player} to play</h1>
        </div> */}

        <div className="info-container">
          <div className="info-con" onClick={() => {
            // setPieces(allPieces)
            // setPlayer('white')
            // setCurr(null)
            // setPrev(null)
            // setSelected(null)
            // setCheckColor(null)
            // setAllmoves([{state: allPieces, analysis: {checkColor, prev, curr}}])
            // setLastmove(null)
            // setSugmoves([])
            if(window.confirm("Are you sure?")){
              window.alert(`${user.color === 'white' ? 'black' : 'white'} won by resignation`)
            }
            }}>
            <h2>Resign</h2>
          </div>

          <div className="rotate" onClick={() => {setRotate(!rotate)}}>
            <h2>Rotate</h2>
          </div>

          {/* <div className="np">
            {gameover && <div className="an" onClick={() => {setIsAOpen(true)}}>Analyse</div>}
            <div className="human-box">
               <h2 className='sr' onClick={() => {}}>{`You are ${user?.color}`}</h2>
            </div>
          </div> */}
        </div>
        <div className="player-con">
          <h1 className="player-name">human VS {mode}</h1>
          <p style={{ color: "blue", cursor: "pointer" }} onClick={() => setMode(mode === 'human' ? 'computer' : 'human')}><span>Play with {mode === 'human' ? 'computer' : 'human'}?</span></p>
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

      <div className="down-pane">
        <div
          className="d-info-con"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              setPieces(allPieces);
              setPlayer("white");
              setCurr(null);
              setPrev(null);
              setSelected(null);
              setCheckColor(null);
              setAllmoves([
                { state: allPieces, analysis: { checkColor, prev, curr } },
              ]);
              setLastmove(null);
              setSugmoves([]);
            }
          }}
        >
          <div>
            <VscChromeClose />
          </div>
        </div>

        <div
          className="d-rotate"
          onClick={() => {
            setRotate(!rotate);
          }}
        >
          <div>
            <BiRotateRight />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Human