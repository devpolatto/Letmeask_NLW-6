import React from 'react';
import './styles.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
}

const Question = (props: QuestionProps) => {
    return (
        <div className="question">
            <p>{props.content}</p>
            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} alt={props.author.name} />
                    <span>{props.author.name}</span>
                </div>
                <div></div>
            </footer>
        </div>
    );
}

export default Question;