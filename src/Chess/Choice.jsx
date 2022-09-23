import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { GiChessKnight } from "react-icons/gi";
import { HiOutlineStatusOnline, HiPuzzle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Choice = () => {
  const navigate = useNavigate();

  return (
    <div className="main-wrapper">
      <div className="logo">
        <h2>
          <GiChessKnight /> Chess World
        </h2>
        <i>@_chessworld</i>
      </div>

      <div className="modal-content">
        <div className="modal-icons" onClick={() => navigate("/searchplayer")}>
          <p>
            Play <br /> Online
          </p>
          <HiOutlineStatusOnline />
        </div>
        <div
          className="modal-icons"
          onClick={() => navigate("/local/humanvshuman")}
        >
          <p>
            Two <br /> players
          </p>
          <FaUserFriends />
        </div>
        <div
          className="modal-icons"
          //   onClick={() => navigate("/online/humanvshuman")}
        >
          <p>
            Play <br /> Computer
          </p>
          <RiComputerFill />
        </div>
        <div
          className="modal-icons"
          //   onClick={() => navigate("/local/humanvscomputer")}
        >
          <p>
            Chess <br /> Puzzles
          </p>
          <HiPuzzle />
        </div>
      </div>
    </div>
  );
};

export default Choice;
