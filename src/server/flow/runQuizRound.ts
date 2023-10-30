import { publish } from "../../ablyAbstractions/publish"
import { subscribe } from "../../ablyAbstractions/subscribe"
import { unsubscribe } from "../../ablyAbstractions/unsubscribe"
import { QuizChannelName } from "../../constants/QuizChannelName"
import { QuizChannelMessages } from "../../defs/QuizChannelMessages"
import { answerHandler } from "../handlers/quiz/answerHandler"
import { getNextQuestion, hasFinishedAllQuestions } from "../states/quiz"
import { User, getLeaderboard } from "../states/users"
import { sleep } from "../utils/sleep"

export async function runQuizRound(): Promise<{
    totalQuestions: number,
    leaderboard: Omit<User, 'participantId'>[]
}> {
    subscribe<QuizChannelMessages, 'answer'>(QuizChannelName, 'answer', answerHandler)

    let totalQuestions = 0

    while(!hasFinishedAllQuestions()) {
        publish<QuizChannelMessages, 'question'>(QuizChannelName, 'question', getNextQuestion())
        totalQuestions += 1

        await sleep(10000)
    }

    unsubscribe<QuizChannelMessages>(QuizChannelName, 'answer')

    return {
        totalQuestions: totalQuestions,
        leaderboard: getLeaderboard()
    }
}