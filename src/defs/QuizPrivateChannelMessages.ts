import { MessageType } from "./MessageType"

export type QuizPrivateChannelMessages = {
    'quizAlreadyStarted': MessageType<{}>,
    'usernameTaken':  MessageType<{}>,
    'connected': MessageType<{}>
}