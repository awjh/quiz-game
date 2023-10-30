import { publish } from "../../../ablyAbstractions/publish"
import { QuizChannelMessages } from "../../../defs/QuizChannelMessages"
import { QuizPrivateChannelMessages } from "../../../defs/QuizPrivateChannelMessages"
import { getPrivateChannelName } from "../../../utils/getPrivateChannelName"
import { isQuizInProgress } from "../../states/quiz"
import { addUser } from "../../states/users"

export async function newParticipantHandler(message: QuizChannelMessages['newParticipant']) {
    const {participantId, username} =  message.data

    const privateChannelName = getPrivateChannelName(message.data.participantId)

    if(isQuizInProgress()) {
       publish<QuizPrivateChannelMessages, 'quizAlreadyStarted'>(
            privateChannelName,
            'quizAlreadyStarted',
            {}
       )

       return
    }

    const { success: addedUserSuccess } = addUser({username, participantId})

    if (!addedUserSuccess) {
        publish<QuizPrivateChannelMessages, 'usernameTaken'>(
            privateChannelName,
            'usernameTaken',
            {}
        )
        return
    }

    publish<QuizPrivateChannelMessages, 'connected'>(
        privateChannelName,
        'connected',
        {}
   )
}