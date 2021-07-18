import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss";
import Button from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FormEvent } from 'react'
import { useState } from "react";
import { database } from "../services/firebase";

const NewRoom = () => {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('')
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const handleCreateRoom = async (e:FormEvent) => {
    e.preventDefault()

    setLoading(true)

    if(newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })
    
    history.push(`/rooms/${firebaseRoom.key}`)

    setLoading(false)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire dúvidas de sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">{loading ? 'Carregando...' : 'Criar sala'}</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui!</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
