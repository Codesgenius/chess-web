const pieceSymbol = (piece, color) => {
  let l = "";
  if (piece === "knight") l = "n";
  else l = piece.charAt(0);
  if (color === "white") l = l.toUpperCase();
  return l;
};

const toFEN = (pieces) => {
  let fen = "";
  let empty = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      let c = 8 * i + j;
      let piece = pieces[c];
      if (piece.type === "empty") {
        empty++;
      } else {
        if (empty) {
          fen += empty;
          empty = 0;
        }
        fen += pieceSymbol(piece.type, piece.color);
      }

      if (j === 7 && empty) {
        fen += empty;
        empty = 0;
      }
    }
    if (i !== 7) fen += "/";
  }
  return fen;
};

const strToMove = (str) => {
  let l = "abcdefgh";
  let from = [8 - str[1], l.indexOf(str[0])];
  let to = [8 - str[3], l.indexOf(str[2])];
  return { from, to };
};

export { toFEN, strToMove };
