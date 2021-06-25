import { useHistory, useParams } from 'react-router-dom'

// import { useAuth } from 'src/hooks/useAuth';
import { useRoom } from 'src/hooks/useRoom';

import Question from '../components/Question';

import Header from '../components/Header';
import Button from 'src/components/Button';

import { database } from 'src/services/firebase';

import '../styles/room.scss';

import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';


type RoomParams = {
    id: string;
}

const AdminRoom: React.FC = () => {

    // allows getting the parameters passed in the URL
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId)
    const hisroty = useHistory();

    async function handleEndRoom(roomId: string) {

        console.log(roomId)
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        hisroty.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Você têm certeza que deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleDeleteQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true
        })

    }


    return (
        <div id="page-room">
            <Header>
                <Button isOutlined onClick={() => handleEndRoom(roomId)}>
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
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighlighted}
                            >
                                {
                                    !question.isAnswered && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteQuestionAsAnswered(question.id)}
                                            >
                                                <img src={checkImg} alt="Marcar pergunta como respondida" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleHighlightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Dar destaque à pergunta" />
                                            </button>
                                        </>
                                    )
                                }

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