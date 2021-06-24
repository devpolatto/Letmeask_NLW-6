import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import Button from '../components/Button';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { database } from 'src/services/firebase';

const NewRoom: React.FC = () => {

    const { user } = useAuth()
    const [newRoom, setNewRoom] = useState('')

    async function handleCreateNewRoom(event: FormEvent) { // create a new room
        event.preventDefault(); // Prevent native html redirects the <farm/> event

        // The trim() method removes white space from the beginning and/or end of a text.
        if (newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp; A ao-vivo</strong>
                <p>Tire as dúvidas de suas audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateNewRoom}>
                        <input
                            type="text"
                            placeholder={'Nome da sala'}
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button>
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    );
}

export default NewRoom;