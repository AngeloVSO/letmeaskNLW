import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import RoomCode from "../components/RoomCode";
import '../styles/room.scss'

const Room = () => {
  return (
    <div id ="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <RoomCode />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala Teste</h1>
          <span>X perguntas</span>
        </div>

        <form>
          <textarea placeholder="Faça sua pergunta..." />
          <div className="form-footer">
            <span>
              Para enviar uma pergunta, <button>faça o login.</button>
            </span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Room;
