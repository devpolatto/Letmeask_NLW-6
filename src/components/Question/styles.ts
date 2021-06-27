import { ReactNode } from 'react'
import styled from 'styled-components';

interface ContainerProps {
    isAnswered?: boolean | null,
    isHighLighted?: boolean | null,
    children: ReactNode
}

export const Container = styled.div<ContainerProps>`
    padding: 24px;
    border-radius: 8px;
    border: ${props => props.isHighLighted ? '1px solid #835af3;' : 'none'};

    background: ${props => {
        if (props.isAnswered) {
            return '#dbdcdd';
        }
        if (props.isHighLighted) {
            return '#f4f0ff';
        }
        else {
            return '#fefefe';
        }
    }};
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
`

export const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;

    img{
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    span {
        margin-left: 8px;
        color: #737380;
        font-size: 14px;
    }
`