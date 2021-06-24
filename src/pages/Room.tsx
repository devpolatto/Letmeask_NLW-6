import Header from '../components/Header';
import Button from 'src/components/Button';

import '../styles/room.scss';

const Room: React.FC = () => {
    return (
        <div id="page-room">

            <Header />

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>
                <form>
                    <textarea placeholder="O que voce quer perguntar?"></textarea>
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>

            </main>

        </div>
    )
}

export default Room;