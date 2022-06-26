import { useState } from 'react';
import ReactModal from 'react-modal';
import {FaForward, FaBackward, FaPlay} from 'react-icons/fa'
import Piece from './components/Piece';
import { squares } from './utils/pieces'

const customStyles = {
  content: {
    padding: "10px",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

const Analysis = ({isAOpen, setIsAOpen, allmoves, states}) => {
    const [currmove, setCurrmove] = useState(0)

    return (
        <ReactModal
            isOpen={isAOpen}
            onRequestClose={() => setIsAOpen(false)}
            style={customStyles}
            contentLabel="Analysis Modal"
        >
        <div className="modal-content">
            <div className={`main-container`}>
                <div className="grid-container">
                    {squares.map((item, index) => (
                        <div key={index} className={`grid-item ${item.type}`}>
                            <Piece item={allmoves[currmove].state[index]} analysis={allmoves[currmove].analysis}
                                {...states}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="container flex-center">
            <div className="np">
            <FaBackward onClick={() => {setCurrmove(currmove > 0 ? currmove - 1 : 0)}} className='fb'/> 
            <FaPlay className='play'/>  
            <FaForward onClick={() => {setCurrmove(currmove < allmoves.length-1 ? currmove + 1 : currmove)}} className='fb' />
            </div>
        </div>

        <div className="container flex-center">
            <button className="modal-button" id='cancel' onClick={() => setIsAOpen(false)}>Cancel</button>
        </div>
  </ReactModal>
  );
}

export default Analysis;