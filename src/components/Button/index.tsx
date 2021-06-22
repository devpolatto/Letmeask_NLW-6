import { ButtonHTMLAttributes } from 'react'

import '../../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC = (props: ButtonProps) => {
    return (
        <button className="button" {...props}>
            Botao componente
        </button>
    );
}

export default Button;