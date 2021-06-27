import { ReactNode } from 'react';
import { useParams } from 'react-router-dom'

import RoomCode from '../RoomCode';

import { Container, Content, Tools } from './styles';

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
        <Container>
            <Content className="content">
                <img src={logoImg} alt="Letmask" />
                <Tools>
                    <RoomCode code={params.id} />
                    {props.children}
                </Tools>
            </Content>
        </Container>
    );
}

export default Header;