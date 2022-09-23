import React from "react";
import {
  GiChessKnight,
  GiChessBishop,
  GiChessRook,
  GiChessQueen,
  GiChessKing,
} from "react-icons/gi";
const Officials = () => {
  return (
    <div className="chess-loader-s">
      <GiChessBishop />
      <GiChessKnight />
      <GiChessRook />
      <GiChessQueen />
      <GiChessKing />
    </div>
  );
};

export default Officials;
