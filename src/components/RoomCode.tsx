import copyImg from "../assets/images/copy.svg";
import '../styles/roomCode.scss'

type RoomCodeProps = {
  code: string
}

const RoomCode = ({code}:RoomCodeProps) => {
  const copyRoomCode = () => {
    navigator.clipboard.writeText(code)
  }
  
  return (
    <button className="room-code" onClick={copyRoomCode}>
      <div>
        <img src={copyImg} alt="Código da sala" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
};

export default RoomCode;
