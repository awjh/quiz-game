import { Question } from "../../defs/Question"
import { getNumCurrentUsers } from "./users"

let currentQuestionIdx = -1
let requiredNumberOfUsers = 2
let questions: Question[] = []

export function resetQuiz(questionSet: Question[]) {
    currentQuestionIdx = -1
    questions = questionSet
}

export function getCurrentQuestionIdx(): number {
    return currentQuestionIdx
}

export function isQuizInProgress(): boolean {
    return currentQuestionIdx !== -1
}

export function hasFinishedAllQuestions(): boolean {
    return currentQuestionIdx >= questions.length - 1
}

export function haveEnoughParticipants(): boolean {
    return getNumCurrentUsers() >= requiredNumberOfUsers
}

export function getNextQuestion() {
    currentQuestionIdx += 1

    return {
        currentQuestionIdx,
        question: questions[currentQuestionIdx].question,
        answers: questions[currentQuestionIdx].answers.map((answer) => answer.value)
    }
}
