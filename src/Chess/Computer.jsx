import React, { useState, useRef, useEffect } from "react";
// import {FaForward, FaBackward, FaPlay} from 'react-icons/fa'
import Analysis from "./Analysis";
import Modal from "./components/Modal";
import Piece from "./components/Piece";
import useClickOutside from "./hooks/useClickOutside";
import { squares, pieces as allPieces } from "./utils/pieces";
import { getMoves, move } from "./utils/movement";
import { checkForChecks, checkForMate, checkForStale } from "./utils/check";
import { strToMove, toFEN } from "./utils/encoding";
import { BiLeftTopArrowCircle } from "react-icons/bi";

const Computer = () => {
  // const [engine, setEngine] = useState(null);

  // useEffect(() => {
  //   import("stockfish.js").then((Stockfish) => {
  //     const stockfish = Stockfish();
  //     stockfish.onmessage = function (event) {
  //       console.log(event.data);
  //     };
  //     setEngine(stockfish);
  //   });
  // }, []);
  // const engine = stockfish();

  // useEffect(() => {
  //   if (engine) {
  //     engine.postMessage("uci");
  //     engine.postMessage("isready");
  //     engine.postMessage("ucinewgame");
  //     engine.postMessage("position startpos");
  //   }
  // }, [engine]);

  // useEffect(() => {
  //   engine.postMessage("go depth 15");

  //   engine.onmessage = (event) => {
  //     const match = event.data.match(
  //       /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/
  //     );
  //     if (match) {
  //       const bestMove = match[0];
  //       console.log("Best move:", bestMove);
  //     }
  //   };
  // }, [engine]);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setSelected(null));

  const [mode, setMode] = useState("human");
  const [searchHuman, setSearchHuman] = useState("search");
  const [myres, setMyres] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [crown, setCrown] = useState(null);
  const [rotate, setRotate] = useState(false);
  const [player, setPlayer] = useState("white");
  const [computer, setComputer] = useState("black");
  const [selected, setSelected] = useState(null);
  const [prev, setPrev] = useState(null);
  const [pieces, setPieces] = useState(allPieces);
  const [curr, setCurr] = useState(null);
  const [checkColor, setCheckColor] = useState(null);
  const [sugmoves, setSugmoves] = useState([]);
  const [lastmove, setLastmove] = useState(null);
  const [isAOpen, setIsAOpen] = useState(false);
  const [castle, setCastle] = useState([true, true, true, true]);
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

  useEffect(() => {
    if (player !== computer) return;
    // fetch(
    //   `https://www.chessdb.cn/cdb.php?action=querypv&board=${encodeURI(
    //     toFEN(pieces)
    //   )}%20${computer.charAt(0)}%20KQkq%20-&json=1`
    // )
    fetch(
      `https://lichess.org/api/cloud-eval?fen=${encodeURI(
        toFEN(pieces)
      )}%20${computer.charAt(0)}%20${
        castle.map((e, i) => (e ? "KQkq"[i] : "")).join("") + "%20"
      }-&json=1`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let { from, to } = strToMove(res["pvs"][0]["moves"].split(" ")[0]);
        compMove(from, to);
      })
      .catch((err) => {
        fetch(
          `https://www.chessdb.cn/cdb.php?action=querypv&board=${encodeURI(
            toFEN(pieces)
          )}%20${computer.charAt(0)}%20${
            castle.map((e, i) => (e ? "KQkq"[i] : "")).join("") + "%20"
          }-&json=1`
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            let { from, to } = strToMove(res["pv"][0]);
            compMove(from, to);
          })
          .catch((err) => {
            console.log("Double error");
            alert("Chess engine trial ended, thanks for trying");
          });
      });

    return () => {};
  }, [player, computer, castle]);

  const compMove = (from, to) => {
    let fromPiece = pieces.find(
      (item) => item.position.join("") === from.join("")
    );
    let toPiece = pieces.find((item) => item.position.join("") === to.join(""));
    if (fromPiece.color === toPiece.color && toPiece.type === "rook") {
      if (to[1] === 0) {
        to[1] = 2;
      } else if (to[1] === 7) {
        to[1] = 6;
      }
      toPiece = pieces.find((item) => item.position.join("") === to.join(""));
    }

    console.log({ fromPiece, toPiece });
    const { id, position } = toPiece;
    const selected = fromPiece.id;

    let newPieces = [...pieces];
    let oldPieces = [...pieces];
    let oldPlayer = player;
    let oldCheck = checkColor;

    if (move(fromPiece, to, newPieces, lastmove)) {
      if (pawnIsCrowning(fromPiece)) {
        setIsOpen(true);
        setMyres({ selected, position, fromPiece });
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
      console.log("reached b");
      setSelected(null);
      setCurr(id);
      setPrev(selected);
      setPlayer(player === "white" ? "black" : "white");
      console.log("User to play");
      setCheckColor(null);

      checkForChecks(newPieces, (checkColor) => {
        setCheckColor(checkColor);
        if (checkColor === player) {
          setCheckColor(oldCheck);
          setPieces(oldPieces);
          setPlayer(oldPlayer);
          console.log("Move reversed Computer to play");
          setSelected(null);
          setPrev(null);
          setCurr(null);
        }

        if (checkColor) {
          if (checkForMate(newPieces, checkColor)) {
            setTimeout(() => {
              alert(
                `Checkmate for ${checkColor === "white" ? "black" : "white"}`
              );
            }, 100);
          }
        }
      });

      if (checkForStale(newPieces, player === "white" ? "black" : "white")) {
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

      if (fromPiece.type === "rook") {
        if (fromPiece.color === "white") {
          if (from[1] === 0) {
            setCastle([castle[0], false, castle[2], castle[3]]);
          }
          if (from[1] === 7) {
            setCastle([false, castle[1], castle[2], castle[3]]);
          }
        } else {
          if (from[1] === 0) {
            setCastle([castle[0], castle[1], castle[2], false]);
          }
          if (from[1] === 7) {
            setCastle([castle[0], castle[1], false, castle[3]]);
          }
        }
      }

      if (fromPiece.type === "king") {
        if (fromPiece.color === "white") {
          setCastle([false, false, castle[2], castle[3]]);
        } else {
          setCastle([castle[0], castle[1], false, false]);
        }
      }
    }
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
          if (curItem.type === "rook") {
            if (curItem.color === "white") {
              if (curItem[id][1] === 0) {
                setCastle([castle[0], false, castle[2], castle[3]]);
              }
              if (curItem[id][1] === 7) {
                setCastle([false, castle[1], castle[2], castle[3]]);
              }
            } else {
              if (curItem[id][1] === 0) {
                setCastle([castle[0], castle[1], castle[2], false]);
              }
              if (curItem[id][1] === 7) {
                setCastle([castle[0], castle[1], false, castle[3]]);
              }
            }
          }

          if (curItem.type === "king") {
            if (curItem.color === "white") {
              setCastle([false, false, castle[2], castle[3]]);
            } else {
              setCastle([castle[0], castle[1], false, false]);
            }
          }
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

      <div className="left-pane">
        <div className="player-con">
          <h1 className="player-name">{player} to play</h1>
        </div>

        <div className="info-container">
          <div
            className="info-con"
            onClick={() => {
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

          <div className="np">
            {/* <div className="an" onClick={() => {setIsAOpen(true)}}>Analyse</div> */}
            <div className="human-box">
              {mode === "human" && (
                <h2 className="sr" onClick={() => setSearchHuman("done")}>
                  {searchHuman === "search"
                    ? "Search random"
                    : searchHuman === "searching"
                    ? "searching"
                    : searchHuman === "done"
                    ? `connected to ${player}`
                    : "unable to find user"}
                </h2>
              )}
            </div>
          </div>
        </div>
        <div className="player-con">
          <h1 className="player-name">human VS {mode}</h1>
          <p
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setMode(mode === "human" ? "computer" : "human")}
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
    </div>
  );
};

export default Computer;
