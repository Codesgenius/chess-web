import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Join = ({socket}) => {
    const navigate = useNavigate()
    const [rooms, setRooms] = useState([])
    const [status, setStatus] = useState("normal")
    const [name, setName] = useState('user'+Math.floor(200+ Math.random()*10000));
    // const [user, setUser] = useState({})

    useEffect( () =>  {
        socket.on("joined", ({user, room}) => {
            toast(`${user} has joined you in ${room}`)
        })

        socket.on("ready", ({users}) => {
            const user = users.find((user) => user.name === name)
            setStatus("done")
            navigate("/online/humanvshuman", {state: {user}})
        })

        socket.on("games", (games) => {
            setRooms(games)
        })
        
    },[name, navigate, socket])
  
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <p style={{ color: "blue" }}>{rooms && `${rooms.length} available games`}</p>

                {/* <div>
                    {rooms.map((item, index) => {
                        return <p className="games" key={index} onClick={() => {
                            if(!name){
                                alert("Please enter your name")
                            }
                            socket.emit('join', {name, room: item}, (error) => {
                                if(error) {
                                    alert(error);
                                }
                            })
                        }}>{item}</p>
                    })}
                </div> */}

                {status === "searching" && (<div><p className="user-msg">Searching...</p></div>)}
                {status === "done" && (<div><p className="user-msg">Connecting to user</p></div>)}

                <div style={{ display: "flex" }}>
                    <button className={'button join-btn mt-20'}
                        onClick={()=> {
                            socket.emit('join', {name}, (error) => {
                                if(error) {
                                    alert(error);
                                }
                            })
                            setName(name)
                            setStatus("searching")
                        }}
                        type="submit">Search game
                    </button>
                </div>
            </div>
        </div>
    );
};
  
export default Join;