import { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { useAuth } from 'src/hooks/useAuth';

import QUestion from '../components/Question';

import Header from '../components/Header';
import Button from 'src/components/Button';

import { database } from 'src/services/firebase';

import '../styles/room.scss';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    sHighLighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}

type RoomParams = {
    id: string;
}

const Room: React.FC = () => {

    // allows getting the parameters passed in the URL
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    const { user } = useAuth();

    const roomId = params.id;

    // Search all questions in the room
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    author: value.author,
                    content: value.content,
                    isAnswered: value.isAnswered,
                    isHighLighted: value.sHighLighted
                }
            })

            console.log(parsedQuestions)

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })

        console.log(roomId)
    }, [roomId])

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

            <Header />

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 &&
                        <span>{questions.length} {questions.length > 1 ? 'perguntas' : 'pergunta'}</span>
                    }
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que voce quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    ></textarea>
                    <div className="form-footer">
                        {
                            user ? (
                                <div className="user-info">
                                    <img src={user.avatar} alt={user.name} />
                                    <span>{user.name}</span>
                                </div>
                            ) : (
                                <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                            )
                        }
                        <Button disabled={!user} type="submit">Enviar pergunta</Button>
                    </div>
                </form>

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

export default Room;