import copyImg from "../assets/images/copy.svg";
import '../styles/roomCode.scss'

const RoomCode = () => {
  return (
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Código da sala" />
      </div>
      <span>Sala #-MerSf2D7SLeoZ6GGs67</span>
    </button>
  );
};

export default RoomCode;
