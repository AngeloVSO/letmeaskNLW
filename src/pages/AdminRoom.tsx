import { useHistory, useParams } from 'react-router-dom'
import logoImg from "../assets/images/logo.svg";
import Button from "../components/Button";
import Question from '../components/Question';
import RoomCode from "../components/RoomCode";
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import '../styles/room.scss'
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

const AdminRoom = () => {
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { dataQuestions, title } = useRoom(roomId)

  const handleDeleteQuestion = async (questionId:string) => {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })
    history.push('/')
  }

  const handleCheckQuestionAnswered = async (questionId:string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  const handleHighlightQuestion = async (questionId:string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return (
    <div id ="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && 
                <>
                  <button onClick={() => handleCheckQuestionAnswered(question.id)}>
                    <img src={checkImg} alt="Marcar pergunta como respondida"/>   
                  </button>
                  <button onClick={() => handleHighlightQuestion(question.id)}>
                    <img src={answerImg} alt="Dar destaque à pergunta"/>   
                  </button>
                </>}
                <button onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Remover pergunta"/>   
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
