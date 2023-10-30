import { subscribe } from "../../ablyAbstractions/subscribe";
import { QuizChannelName } from "../../constants/QuizChannelName";
import { QuizChannelMessages } from "../../defs/QuizChannelMessages";
import { newParticipantHandler } from "../handlers/quiz/newParticipantHandler";
import { haveEnoughParticipants } from "../states/quiz";
import { sleep } from "../utils/sleep";

export async function waitForParticipants() {
    subscribe<QuizChannelMessages, 'newParticipant'>(QuizChannelName, 'newParticipant', newParticipantHandler)
    
    while(!haveEnoughParticipants()) {
        await sleep(500)
    }

    console.log('Have enough participants')
}