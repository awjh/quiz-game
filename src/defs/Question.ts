export type Question = {
    question: string,
    answers: {
        value: string,
        correct: boolean
    }[]
}