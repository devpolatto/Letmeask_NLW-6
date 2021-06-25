import { useParams } from 'react-router-dom'

// import { useAuth } from 'src/hooks/useAuth';
import { useRoom } from 'src/hooks/useRoom';

import Question from '../components/Question';

import Header from '../components/Header';
import Button from 'src/components/Button';

import { database } from 'src/services/firebase';

import '../styles/room.scss';
import deleteImg from '../assets/images/delete.svg';


type RoomParams = {
    id: string;
}

const AdminRoom: React.FC = () => {

    // allows getting the parameters passed in the URL
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId)

    // const { user } = useAuth();

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Você têm certeza que deseja excluir esta pergunta?')) {
            const question = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return (
        <div id="page-room">
            <Header>
                <Button isOutlined>
                    Encerrar sala
                </Button>
            </Header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&
                        <span>{questions.length} {questions.length > 1 ? 'perguntas' : 'pergunta'}</span>
                    }
                </div>

                {
                    questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Deletar pergunta" />
                                </button>
                            </Question>
                        )
                    })
                }

            </main>

        </div>
    )
}

export default AdminRoom;