import { useParams } from 'react-router-dom'

import RoomCode from '../RoomCode';

import './styles.scss';

import logoImg from '../../assets/images/logo.svg';

type RoomParams = {
    id: string;
}

const Header: React.FC = () => {

    // allows getting the parameters passed in the URL
    const params = useParams<RoomParams>();

    return (
        <header>
            <div className="content">
                <img src={logoImg} alt="Letmask" />
                <RoomCode code={params.id} />
            </div>
        </header>
    );
}

export default Header;