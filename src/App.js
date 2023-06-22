import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import Choice from "./Chess/Choice";
import Chess from "./Chess/Chess";
import Human from "./Chess/Human";
import Join from "./Chess/Join";
import Computer from "./Chess/Computer";
import "./Chess/style.css";

// const socket = io(`http://${window.location.hostname}:8000`)
// const socket = io(`https://chessonweb.herokuapp.com`)
const socket = io(`https://chessbackend-fjpg.onrender.com`);

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Choice socket={socket} />} />
        <Route path="/searchplayer" element={<Join socket={socket} />} />
        <Route path="/local/humanvshuman" element={<Chess socket={socket} />} />
        <Route
          path="/local/humanvscomputer"
          element={<Computer socket={socket} />}
        />
        <Route
          path="/online/humanvshuman"
          element={<Human socket={socket} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
