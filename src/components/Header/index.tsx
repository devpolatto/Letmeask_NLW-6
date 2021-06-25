import { ReactNode } from 'react';
import { useParams } from 'react-router-dom'

import RoomCode from '../RoomCode';

import './styles.scss';

import logoImg from '../../assets/images/logo.svg';

type HeaderProps = {
    children?: ReactNode;
}

type RoomParams = {
    id: string;
}

const Header: React.FC = (props: HeaderProps) => {

    // allows getting the parameters passed in the URL
    const params = useParams<RoomParams>();

    return (
        <header>
            <div className="content">
                <img src={logoImg} alt="Letmask" />
                <div>
                    <RoomCode code={params.id} />
                    {props.children}
                </div>
            </div>
        </header>
    );
}

export default Header;