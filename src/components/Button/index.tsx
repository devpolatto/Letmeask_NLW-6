import { ButtonHTMLAttributes } from 'react'

import './styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <button className="button" color="" {...props} />
    );
}

export default Button;