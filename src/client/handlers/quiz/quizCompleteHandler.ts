import { QuizChannelMessages } from "../../../defs/QuizChannelMessages"

export function quizCompleteHandler(message: QuizChannelMessages['quizComplete']) {
    console.log('Quiz complete.')

    console.log('Leaderboard:')

    let prevScore = -1

    message.data.leaderboard.forEach((score, idx) => {
        console.log(`${score.points === prevScore ? '-' : idx + 1}. ${score.username}: ${score.points}/${message.data.totalQuestions}`)

        prevScore = score.points
    })

    console.log('Thanks for playing!')

    process.exit(0)
}