import { useState, useEffect } from 'react';

import { database } from '../services/firebase';

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    sHighLighted: boolean;
}>


export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

    // Search all questions in the room
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    author: value.author,
                    content: value.content,
                    isAnswered: value.isAnswered,
                    isHighLighted: value.sHighLighted
                }
            })

            console.log(parsedQuestions)

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })

        console.log(roomId)
    }, [roomId])

    return {
        questions, title
    }
}
