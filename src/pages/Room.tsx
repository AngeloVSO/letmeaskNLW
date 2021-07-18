import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";

const Room = () => {
  return (
    <div className="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <div>codigo</div>
        </div>
      </header>

      <main className="content">
          <div className="room-title">
              <h1>Sala Teste</h1>
              <span>X perguntas</span>
          </div>

          <form>
              <textarea
                placeholder="Faça sua pergunta..."
              />
              <div className="form-footer">
                  <span>
                      Para enviar uma pergunta, <button>faça o login.</button> 
                  </span>
                  <Button type="submit">
                      Enviar pergunta
                  </Button>
              </div>
          </form>
      </main>
    </div>
  );
};

export default Room;
