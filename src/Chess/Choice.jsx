import React from 'react'
import {FaUserCheck, FaUserFriends} from 'react-icons/fa'
import {RiComputerFill} from 'react-icons/ri'
import {SiGodotengine} from 'react-icons/si'
import {useNavigate} from 'react-router-dom'

const Choice = () => {
  const navigate = useNavigate()

  return (
    <div>
        <div className="modal-content">
            <div className="modal-icons" onClick={() => navigate("/searchplayer")}>
                <p>Play Human Online</p>
                <FaUserCheck />
            </div>
            <div className="modal-icons" onClick={() => navigate("/local/humanvshuman")}>
                <p>Play Human Locally</p>
                <FaUserFriends />
            </div>
            <div className="modal-icons" onClick={() => navigate("/online/humanvshuman")}>
                <p>Play Computer Locally</p>
                <RiComputerFill />
            </div>
            <div className="modal-icons" onClick={() => navigate("/local/humanvscomputer")}>
                <p>Play Chess Engine Online</p>
                <SiGodotengine />
            </div>
        </div>
    </div>
  )
}

export default Choice