import prompts from "prompts"
import { publish } from "../../ablyAbstractions/publish"
import { subscribe } from "../../ablyAbstractions/subscribe"
import { QuizChannelName } from "../../constants/QuizChannelName"
import { QuizPrivateChannelMessages } from "../../defs/QuizPrivateChannelMessages"
import { Result } from "../../defs/Result"
import { getPrivateChannelName } from "../../utils/getPrivateChannelName"

export async function connectToQuiz(participantId: string): Promise<Result<void>> {
    return new Promise((resolve) => {
        subscribe<QuizPrivateChannelMessages, 'usernameTaken'>(getPrivateChannelName(participantId), 'usernameTaken', async () => {
            await createParticipantProcess(true)
        })
        subscribe<QuizPrivateChannelMessages, 'quizAlreadyStarted'>(getPrivateChannelName(participantId), 'quizAlreadyStarted', async () => {
            resolve({
                success: false,
                error: 'Could not join quiz. Quiz already started'
            })
        })
        subscribe<QuizPrivateChannelMessages, 'connected'>(getPrivateChannelName(participantId), 'connected', async () => {
            resolve({
                success: true,
            })
        })
    
        async function createParticipantProcess(retry?: boolean) {
            const {username} = await prompts({
                type: 'text',
                name: 'username',
                message: retry ? `Username already taken. Enter another username` : 'Enter your username'
            })
            
            publish(QuizChannelName, 'newParticipant', {
                username,
                participantId,
            })
        }
    
        createParticipantProcess()
    })

}