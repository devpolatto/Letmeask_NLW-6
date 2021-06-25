import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom'

import { useAuth } from 'src/hooks/useAuth';
import { useRoom } from 'src/hooks/useRoom';

import QUestion from '../components/Question';

import Header from '../components/Header';
import Button from 'src/components/Button';

import { database } from 'src/services/firebase';

import '../styles/room.scss';


type RoomParams = {
    id: string;
}

const AdminRoom: React.FC = () => {

    // allows getting the parameters passed in the URL
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('')
    const { questions, title } = useRoom(roomId)

    const { user } = useAuth();

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')

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
                            <QUestion
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        )
                    })
                }

            </main>

        </div>
    )
}

export default AdminRoom;