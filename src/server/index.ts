import { instantiateChannel } from '../ablyAbstractions/channels'
import { Questions } from './constants/Questions'
import { QuizChannelName } from '../constants/QuizChannelName'
import { completeQuiz } from './flow/completeQuiz'
import { runQuizRound } from './flow/runQuizRound'
import { waitForParticipants } from './flow/waitForParticipants'
import { resetUsers } from './states/users'
import { resetQuiz } from './states/quiz'


async function start() {
    const { success, error } = await instantiateChannel(QuizChannelName)

    if(!success) {
        console.error(`Failed to start quiz server. ERROR: ${error!}`)
    }

    console.log('Started up quiz channel!')

    while(true) {
        resetUsers()
        resetQuiz(Questions)

        console.log('New quiz waiting for participants!')

        await waitForParticipants()
    
        const roundResult = await runQuizRound()
    
        completeQuiz(roundResult.totalQuestions, roundResult.leaderboard)

        console.log('Quiz completed!')
    }
}

start()