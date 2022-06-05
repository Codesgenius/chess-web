import ReactModal from 'react-modal';
import {FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight} from 'react-icons/fa'
import { checkForChecks, checkForMate, checkForStale } from '../utils/check'

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

const Modal = ({isOpen, setIsOpen, myres, pieces, checkColor, setPieces,setSelected, player, setCurr, setPrev, setPlayer, setCheckColor, setSugmoves, setLastmove }) => {
    const resolveCrown = (choice) => {
        if(!myres)
            return
        let newPieces = [...pieces]
        let oldPieces = [...pieces]
        let oldPlayer = player
        let oldCheck = checkColor

        const {selected, position, item} = myres
        const {id} = item
        newPieces[id] = {...newPieces[id], color: newPieces[selected].color, type: choice}
        newPieces[selected] = {...newPieces[selected], color: undefined, type: 'empty'}

        setPieces(newPieces)
        setSelected(null)
        setCurr(id)
        setPrev(selected)
        setPlayer(player === 'white' ? 'black' : 'white')
        setCheckColor(null)

        checkForChecks(newPieces, (checkColor) => {
            setCheckColor(checkColor)
            if(checkColor === player) {
                setCheckColor(oldCheck)
                setPieces(oldPieces)
                setPlayer(oldPlayer)
                setSelected(null)
                setPrev(null)
                setCurr(null)
            }

            if(checkColor){
                if(checkForMate(newPieces, checkColor)){
                    setTimeout(()=> {
                        alert(`Checkmate for ${checkColor === 'white' ? 'black' : 'white'}`)
                    }, 100)
                }
            }
        })

        if(checkForStale(newPieces, player === 'white' ? 'black' : 'white')){
            setTimeout(()=> {
                alert("Stalemate")
            }, 100)
        }

        setSugmoves([])
        setLastmove({
            ...newPieces[id],
            span: Math.abs(position[0] - newPieces[selected].position[0]),

        })
        setIsOpen(false)
    }
  return (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
    >
    <div className="modal-content">
        <div className="modal-icons" id="queen" onClick={() => resolveCrown("queen")}><FaChessQueen /></div>
        <div className="modal-icons" id="knight" onClick={() => resolveCrown("knight")}><FaChessKnight /></div>
        <div className="modal-icons" id="bishop" onClick={() => resolveCrown("bishop")}><FaChessBishop /></div>
        <div className="modal-icons" id="rook" onClick={() => resolveCrown("rook")}><FaChessRook /></div>
    </div>

    <div className="container">
        <button className="modal-button" id='cancel' onClick={() => setIsOpen(false)}>Cancel</button>
    </div>
  </ReactModal>
  );
}

export default Modal;