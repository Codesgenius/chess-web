import React, { useState, useRef } from "react";
// import {FaForward, FaBackward, FaPlay} from 'react-icons/fa'
import Analysis from "./Analysis";
import Modal from "./components/Modal";
import Piece from "./components/Piece";
import useClickOutside from "./hooks/useClickOutside";
import { squares, pieces as allPieces } from "./utils/pieces";
import { VscChromeClose } from "react-icons/vsc";
import { BiRotateRight } from "react-icons/bi";
import { GiChessKnight } from "react-icons/gi";
import { getMoves, move } from "./utils/movement";
import { checkForChecks, checkForMate, checkForStale } from "./utils/check";
const Chess = () => {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setSelected(null));

  const [mode] = useState("human");
  // const [searchHuman, setSearchHuman] = useState("search");
  const [myres, setMyres] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [crown, setCrown] = useState(null);
  const [rotate, setRotate] = useState(false);
  const [player, setPlayer] = useState("white");
  const [selected, setSelected] = useState(null);
  const [prev, setPrev] = useState(null);
  const [pieces, setPieces] = useState(allPieces);
  const [curr, setCurr] = useState(null);
  const [checkColor, setCheckColor] = useState(null);
  const [sugmoves, setSugmoves] = useState([]);
  const [lastmove, setLastmove] = useState(null);
  const [isAOpen, setIsAOpen] = useState(false);
  const [allmoves, setAllmoves] = useState([
    { state: allPieces, analysis: { checkColor, prev, curr } },
  ]);

  const pawnIsCrowning = (piece) => {
    const { type, position } = piece;
    if (type === "pawn" && (position[0] === 0 || position[0] === 7)) {
      return true;
    }
    return false;
  };

  const userMove = (pieceId) => {
    const clickedPiece = pieces[pieceId];
    const { id, color, position } = clickedPiece;

    if (color === player) {
      setSugmoves(getMoves(clickedPiece, pieces, lastmove));
    }
    if (selected !== null) {
      if (color !== player) {
        const curItem = pieces[selected];
        let newPieces = [...pieces];
        let oldPieces = [...pieces];
        let oldPlayer = player;
        let oldCheck = checkColor;

        if (move(curItem, pieces[id].position, newPieces, lastmove)) {
          if (pawnIsCrowning(clickedPiece)) {
            setIsOpen(true);
            setMyres({ selected, position, clickedPiece });
            return;
          }

          newPieces[id] = {
            ...newPieces[id],
            color: newPieces[selected].color,
            type: newPieces[selected].type,
          };
          newPieces[selected] = {
            ...newPieces[selected],
            color: undefined,
            type: "empty",
            moved: true,
          };
          setPieces(newPieces);
          setSelected(null);
          setCurr(id);
          setPrev(selected);
          setPlayer(player === "white" ? "black" : "white");
          setCheckColor(null);

          checkForChecks(newPieces, (checkColor) => {
            setCheckColor(checkColor);
            if (checkColor === player) {
              setCheckColor(oldCheck);
              setPieces(oldPieces);
              setPlayer(oldPlayer);
              setSelected(null);
              setPrev(null);
              setCurr(null);
            }

            if (checkColor) {
              if (checkForMate(newPieces, checkColor)) {
                setTimeout(() => {
                  alert(
                    `Checkmate for ${
                      checkColor === "white" ? "black" : "white"
                    }`
                  );
                }, 100);
              }
            }
          });

          if (
            checkForStale(newPieces, player === "white" ? "black" : "white")
          ) {
            setTimeout(() => {
              alert("Stalemate");
            }, 100);
          }

          setSugmoves([]);
          setLastmove({
            ...newPieces[id],
            span: Math.abs(position[0] - newPieces[selected].position[0]),
          });
          setAllmoves([
            ...allmoves,
            { state: newPieces, analysis: { checkColor, prev, curr } },
          ]);
          return;
        }
        return console.log("invalid move");
      }
    }

    if (color && player === color) {
      setSelected(id);
    }
    setPrev(null);
    setCurr(null);
  };

  const states = {
    selected,
    prev,
    sugmoves,
    curr,
    checkColor,
    rotate,
    //   makeMove,
    userMove,
  };
  const modalStates = {
    isOpen,
    setIsOpen,
    crown,
    setCrown,
    myres,
    setMyres,
    pieces,
    setPieces,
    setSelected,
    setCurr,
    setPrev,
    setPlayer,
    setCheckColor,
    setSugmoves,
    setLastmove,
    player,
    checkColor,
  };
  const analysisStates = { isAOpen, setIsAOpen, allmoves };

  return (
    <div className="wrapper">
      <Modal {...modalStates} />
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
          <div
            className="info-con"
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
            <h2>Restart</h2>
          </div>

          <div
            className="rotate"
            onClick={() => {
              setRotate(!rotate);
            }}
          >
            <h2>Rotate</h2>
          </div>

          {/* <div className="np">
            <div className="an" onClick={() => {setIsAOpen(true)}}>Analyse</div>
            <div className="human-box">
               {mode === "human" && <h2 className='sr' onClick={() => setSearchHuman("done")}>{searchHuman === "search" ? 
                "Search random" : searchHuman === "searching" ?
                "searching" : searchHuman === "done" ? `connected to ${player}` : "unable to find user"}</h2>}
            </div>
          </div> */}
        </div>
        <div className="player-con">
          <h1 className="player-name">human VS {mode}</h1>
          <p
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              window.alert("Feature not available yet");
              // setMode(mode === 'human' ? 'computer' : 'human')
            }}
          >
            <span>Play with {mode === "human" ? "computer" : "human"}?</span>
          </p>
        </div>
      </div>
      <div className={`main-container ${rotate ? "rotate-con" : ""}`}>
        <div ref={wrapperRef} className="grid-container">
          {squares.map((item, index) => (
            <div key={index} className={`grid-item ${item.type}`}>
              <Piece item={pieces[index]} {...states} />
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
  );
};

export default Chess;
