import { ButtonHTMLAttributes } from 'react'

import './styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC = (props: ButtonProps) => {
    return (
        <button className="button" color=""  {...props}>
            {props.children}
        </button>
    );
}

export default Button;