import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import Button from '../components/Button'

const Home = () => {
  return(
    <div id="page-auth">
        <aside>
            <img src={illustrationImg} alt="Ilustração de perguntas e respostas"/>
            <strong>Crie salas de Q&A ao-vivo</strong>
            <p>Tire dúvidas de sua audiência em tempo real</p>
        </aside>

        <main>
            <div className="main-content">
                <img src={logoImg} alt="Letmeask" />
                <button className="google-button">
                    <img src={googleIcon} alt="Logo Google" />
                    Crie sua sala com google
                </button>
                <div className="separator">
                    ou entre em uma sala
                </div>
                <form>
                    <input 
                        type="text"
                        placeholder="Digite o código da sala" 
                    />
                    <Button type="submit">
                        Entrar na sala
                    </Button>
                </form>
            </div>
        </main>
    </div>
  )
}

export default Home