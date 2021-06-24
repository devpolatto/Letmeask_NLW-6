import './styles.scss';

import logoImg from '../../assets/images/logo.svg';

const Header: React.FC = () => {
    return (
        <header>
            <div className="content">
                <img src={logoImg} alt="Letmask" />
                <div>codigo</div>
            </div>
        </header>
    );
}

export default Header;