import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom'
import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import RoomCode from "../components/RoomCode";
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss'

type RoomParams = {
  id: string;
}

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}

type FirbaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}>

const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [question, setQuestion] = useState('');
  const [dataQuestions, setDataQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')
  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const dbRoom =  room.val()
      const resultQuestions: FirbaseQuestions = dbRoom.questions ?? {}
      const parsedQuestions = Object.entries(resultQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      })
      setTitle(dbRoom.title)
      setDataQuestions(parsedQuestions)
    })

  }, [roomId])

  const handleCreateNewQuestion = async (e: FormEvent) => {
    e.preventDefault()

    if (question.trim() === '') {
      return
    }

    if(!user){
      throw new Error("Você precisar estar logado!")
    }

    const newQuestion = {
      content: question,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(newQuestion)

    setQuestion('')
  }

  return (
    <div id ="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {dataQuestions.length > 0 && <span>{dataQuestions.length} pergunta(s)</span>} 
        </div>

        <form onSubmit={handleCreateNewQuestion}>
          <textarea 
            placeholder="Faça sua pergunta..." 
            onChange={e => setQuestion(e.target.value)}
            value={question}
          />
          <div className="form-footer">
            {!user ? 
              <span>Para enviar uma pergunta, <button>faça o login.</button></span> :
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        {JSON.stringify(dataQuestions)}
      </main>
    </div>
  );
};

export default Room;
