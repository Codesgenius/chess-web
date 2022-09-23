import React from "react";
import {
  GiChessKnight,
  GiChessBishop,
  GiChessRook,
  GiChessQueen,
  GiChessKing,
} from "react-icons/gi";
const Loader = () => {
  return (
    <div className="chess-loader">
      <GiChessBishop className="cl-a" />
      <GiChessKnight className="cl-b" />
      <GiChessRook className="cl-c" />
      <GiChessQueen className="cl-d" />
      <GiChessKing className="cl-e" />
    </div>
  );
};

export default Loader;
