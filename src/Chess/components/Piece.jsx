import React from "react";
import {
  FaChessRook,
  FaChessBishop,
  FaChessKing,
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
} from "react-icons/fa";

const Piece = ({
  item,
  selected,
  prev,
  sugmoves,
  curr,
  checkColor,
  rotate,
  //   makeMove,
  userMove,
}) => {
  const { id, type, color, position } = item;

  const renderIcon = () => {
    switch (type) {
      case "rook":
        return <FaChessRook color={color} />;
      case "bishop":
        return <FaChessBishop color={color} />;
      case "king":
        return <FaChessKing color={color} />;
      case "knight":
        return <FaChessKnight color={color} />;
      case "pawn":
        return <FaChessPawn color={color} />;
      case "queen":
        return <FaChessQueen color={color} />;
      default:
        return null;
    }
  };


  const handleClick = () => {
    userMove(id);
  };

  //   if (analysis) {
  //     return (
  //       <div
  //         className={`piece-con ${
  //           analysis.selected === id ? "selected-con" : ""
  //         } ${analysis.prev === id ? "prev-con" : ""}
  //         ${analysis.curr === id ? "curr-con" : ""} ${
  //           analysis.checkColor === color && type === "king" ? "check-con" : ""
  //         }`}
  //       >
  //         {renderIcon()}
  //       </div>
  //     );
  //   }

  return (
    <div
      className={`piece-con ${selected === id ? "selected-con" : ""} ${
        rotate ? "rotate-con" : ""
      }
     ${
       sugmoves.find((sug) => sug[0] === position[0] && sug[1] === position[1])
         ? "sug-con"
         : ""
     } ${prev === id ? "prev-con" : ""} 
     ${curr === id ? "curr-con" : ""} ${
        checkColor === color && type === "king" ? "check-con" : ""
      } `}
      onClick={() => handleClick()}
    >
      {renderIcon()}
    </div>
  );
};

export default Piece;
