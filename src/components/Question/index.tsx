import React, { ReactNode } from 'react';
import './styles.scss';

import { Container, Footer, UserInfo } from './styles';

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
        // <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted && !isAnswered ? 'highlightd' : ''}`}>
        <Container isAnswered={isAnswered} isHighLighted={isHighLighted}>
            <p>{props.content}</p>
            <Footer>
                <UserInfo className="user-info">
                    <img src={props.author.avatar} alt={props.author.name} />
                    <span>{props.author.name}</span>
                </UserInfo>
                <div>
                    {props.children}
                </div>
            </Footer>
        </Container>
        // </div>
    );
}

export default Question;