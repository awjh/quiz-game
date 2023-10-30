import { QuizChannelMessages } from "../../defs/QuizChannelMessages";
import { publish } from "../../ablyAbstractions/publish";
import { unsubscribe } from "../../ablyAbstractions/unsubscribe";
import { QuizChannelName } from "../../constants/QuizChannelName";
import { User, resetUsers } from "../states/users";
import { resetQuiz } from "../states/quiz";
import { Questions } from "../constants/Questions";

export function completeQuiz(totalQuestions: number, leaderboard: Omit<User, 'participantId'>[]) {
    publish<QuizChannelMessages, 'quizComplete'>(QuizChannelName, 'quizComplete', {
        totalQuestions,
        leaderboard: leaderboard,
    })

    unsubscribe<QuizChannelMessages>(QuizChannelName, 'newParticipant')
}