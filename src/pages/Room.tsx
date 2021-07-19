import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom'
import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import Question from '../components/Question';
import RoomCode from "../components/RoomCode";
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import '../styles/room.scss'

type RoomParams = {
  id: string;
}

const Room = () => {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { dataQuestions, title } = useRoom(roomId)

  const handleCreateNewQuestion = async (e: FormEvent) => {
    e.preventDefault();

    if (question.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("Você precisar estar logado!");
    }

    const newQuestion = {
      content: question,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(newQuestion);

    setQuestion("");
  };

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
        <div className="question-map">
          {dataQuestions.map(question => {
            return (
              <Question 
                key={question.id} 
                content={question.content} 
                author={question.author}
              />
            )
          })}
        </div>
      </main>
    </div>
  );
};

export default Room;
