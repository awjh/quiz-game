import prompts from "prompts";
import { publish } from "../../../ablyAbstractions/publish";
import { QuizChannelName } from "../../../constants/QuizChannelName";
import { QuizChannelMessages } from "../../../defs/QuizChannelMessages";
import { getParticipantId } from "../../utils/participantId";

export async function questionHandler(message: QuizChannelMessages['question']) {
        const { answer } = await prompts({
            type: 'select',
            name: 'answer',
            message: message.data.question,
            choices: message.data.answers.map((answer) => ({
                title: answer,
                value: answer
            }))
        })

        publish<QuizChannelMessages, 'answer'>(QuizChannelName, 'answer', {
            answer: answer,
            currentQuestionIdx: message.data.currentQuestionIdx,
            participantId: getParticipantId(),
        })

        console.log('Waiting...')
}