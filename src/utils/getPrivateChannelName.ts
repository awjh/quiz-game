import { QuizChannelName } from "../constants/QuizChannelName";

export function getPrivateChannelName(participantId: string): string {
    return `${QuizChannelName}:${participantId}`
}