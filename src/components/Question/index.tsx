import React, { ReactNode } from 'react';
import './styles.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighLighted?: boolean
}

const Question = ({ isAnswered = false, isHighLighted = false, ...props }: QuestionProps) => {
    return (
        <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted && !isAnswered ? 'highlightd' : ''}`}>
            <p>{props.content}</p>
            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} alt={props.author.name} />
                    <span>{props.author.name}</span>
                </div>
                <div>
                    {props.children}
                </div>
            </footer>
        </div>
    );
}

export default Question;