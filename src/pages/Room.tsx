import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom'

import { useAuth } from 'src/hooks/useAuth';

import Header from '../components/Header';
import Button from 'src/components/Button';

import { database } from 'src/services/firebase';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

const Room: React.FC = () => {

    // allows getting the parameters passed in the URL
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('')
    const { user } = useAuth();

    const roomId = params.id;

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
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
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

            </main>

        </div>
    )
}

export default Room;