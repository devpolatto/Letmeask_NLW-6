import copyImg from '../../assets/images/copy.svg'

import './styles.scss';

type RoomCodeProps = {
    code: string;
}

const RoomCode = ({ code }: RoomCodeProps) => {

    function copyCodeToClipBoard() {
        navigator.clipboard.writeText(code)
    }

    return (
        <button className="room-code" onClick={copyCodeToClipBoard}>
            <div className="copy">
                <img src={copyImg} alt="copy room code" />
            </div>
            <span>Sala #{code}</span>
        </button>
    );
}

export default RoomCode;