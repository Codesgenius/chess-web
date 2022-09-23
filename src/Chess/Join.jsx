import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GiChessKnight } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import Officials from "./components/Officials";

const Join = ({ socket }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState("normal");
  const [name, setName] = useState(
    "user" + Math.floor(200 + Math.random() * 10000)
  );
  useEffect(() => {
    socket.on("joined", ({ user, room }) => {
      toast(`${user} has joined you in ${room}`);
    });

    socket.on("ready", ({ users }) => {
      const user = users.find((user) => user.name === name);
      setStatus("done");
      navigate("/online/humanvshuman", { state: { user } });
    });

    socket.on("games", (games) => {
      setRooms(games);
    });
  }, [name, navigate, socket]);

  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <div className="logo">
          <h2>
            <GiChessKnight /> Chess World
          </h2>
          <i>@_chessworld</i>
        </div>

        <div className="loading-wrapper">
          {status === "normal" ? <Officials /> : <Loader />}
          <div>
            {status === "searching" && (
              <div>
                <p className="user-msg">Searching...</p>
              </div>
            )}
            {status === "done" && (
              <div>
                <p className="user-msg">Connecting to user</p>
              </div>
            )}
          </div>
        </div>

        <p style={{ color: "blue" }}>
          {rooms &&
            `${rooms.length} game${rooms.length > 1 ? "s" : ""} in play`}
        </p>

        <div style={{ display: "flex" }}>
          <button
            className={"button join-btn mt-20"}
            onClick={() => {
              socket.emit("join", { name }, (error) => {
                if (error) {
                  alert(error);
                }
              });
              setName(name);
              setStatus("searching");
            }}
            type="submit"
          >
            Random search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
