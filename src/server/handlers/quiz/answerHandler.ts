import { Questions } from "../../constants/Questions"
import { getCurrentQuestionIdx } from "../../states/quiz"
import { incrementUserScore } from "../../states/users"
import { QuizChannelMessages } from "../../../defs/QuizChannelMessages"

export function answerHandler(message: QuizChannelMessages['answer']) {
    if(message.data.currentQuestionIdx !== getCurrentQuestionIdx()) {
        return
    }

    if (message.data.answer === Questions[message.data.currentQuestionIdx].answers.find(({correct}) => correct)!.value) {
        incrementUserScore(1, message.data.participantId)
    }
}