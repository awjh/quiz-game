import Ably from 'ably'
import { subscribe } from '../ablyAbstractions/subscribe'
import { QuizChannelMessages } from '../defs/QuizChannelMessages'
import { getPrivateChannelName } from '../utils/getPrivateChannelName'
import { instantiateChannel } from '../ablyAbstractions/channels'
import { QuizChannelName } from '../constants/QuizChannelName'
import { connectToQuiz } from './flow/connectToQuiz'
import { questionHandler } from './handlers/quiz/questionHandler'
import { quizCompleteHandler } from './handlers/quiz/quizCompleteHandler'
import { getParticipantId } from './utils/participantId'

const realtime = new Ably.Realtime({
    echoMessages: false,
    key: 'QNKh4g.wGQkYg:yMt1WvT5fl7LG9ZYBfikJnm0WIXBuQ3T1aMDx8YitpE'
})

async function start() {
    const { success, error } = await instantiateChannel(getPrivateChannelName(getParticipantId()))

    if(!success) {
        console.error(`Failed to start quiz client. ERROR: ${error!}`)
    }

    console.log('Welcome to the quiz client!')

    const {success: connectToQuizSuccess, error: connectToQuizError} = await connectToQuiz(getParticipantId())

    if(!connectToQuizSuccess) {
        console.error(`Failed to connect to quiz. ERROR: ${connectToQuizError}`)
        process.exit(1)
    }

    console.log('Waiting for quiz to start...')

    subscribe<QuizChannelMessages, 'question'>(QuizChannelName, 'question', questionHandler)
    subscribe<QuizChannelMessages, 'quizComplete'>(QuizChannelName, 'quizComplete', quizCompleteHandler)
}

start()