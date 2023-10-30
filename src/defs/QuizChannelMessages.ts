import { User } from "../server/states/users"
import { MessageType } from "./MessageType"

export type QuizChannelMessages = {
    'newParticipant': MessageType<Pick<User, 'participantId' | 'username'>>,
    'answer': MessageType<{
        answer: string,
        currentQuestionIdx: number,
        participantId: string
    }>,
    'question': MessageType<{
        question: string,
        currentQuestionIdx: number,
        answers: string[],
    }>,
    'quizComplete': MessageType<{
        totalQuestions: number
        leaderboard: Pick<User, 'username' | 'points'>[]
    }>
}