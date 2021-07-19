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

const AdminRoom = () => {
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
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {dataQuestions.length > 0 && <span>{dataQuestions.length} pergunta(s)</span>} 
        </div>

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

export default AdminRoom;
