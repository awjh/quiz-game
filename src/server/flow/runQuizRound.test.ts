import { publish } from "../../ablyAbstractions/publish"
import { subscribe } from "../../ablyAbstractions/subscribe"
import { unsubscribe } from "../../ablyAbstractions/unsubscribe"
import { QuizChannelName } from "../../constants/QuizChannelName"
import { Questions } from "../constants/Questions"
import { answerHandler } from "../handlers/quiz/answerHandler"
import { getNextQuestion, hasFinishedAllQuestions } from "../states/quiz"
import { getLeaderboard } from "../states/users"
import { sleep } from "../utils/sleep"
import { runQuizRound } from "./runQuizRound"

jest.mock('../../ablyAbstractions/subscribe')
jest.mock('../../ablyAbstractions/publish')
jest.mock('../../ablyAbstractions/unsubscribe')

jest.mock('../states/quiz')
jest.mock('../utils/sleep')
jest.mock('../states/users')

describe('runQuizRound', () => {
    const mockSubscribe = subscribe as jest.MockedFn<typeof subscribe>
    const mockPublish = publish as jest.MockedFn<typeof publish>
    const mockUnsubscribe = unsubscribe as jest.MockedFn<typeof unsubscribe>

    const mockHasFinishedAllQuestions = hasFinishedAllQuestions as jest.MockedFn<typeof hasFinishedAllQuestions>
    const mockGetNextQuestion = getNextQuestion as jest.MockedFn<typeof getNextQuestion>
    const mockSleep = sleep as jest.MockedFn<typeof sleep>
    const mockGetLeaderboard = getLeaderboard as jest.MockedFn<typeof getLeaderboard>

    const fakeLeaderboard = [{
        username: 'user1',
        points: 2,
    }, {
        username: 'user2',
        points: 1
    }]

    const testQuestionsLength = Questions.length

    const expectedQuestions: ReturnType<typeof getNextQuestion>[] = []

    beforeEach(() => {
        jest.resetAllMocks()


        for (let i = 0; i < testQuestionsLength; i++) {
            mockHasFinishedAllQuestions
                .mockReturnValueOnce(false)

            const expectedQuestion = {
                currentQuestionIdx: i,
                question: Questions[i].question,
                answers: Questions[i].answers.map(({value}) => value)
            }
            
            mockGetNextQuestion.mockReturnValueOnce(expectedQuestion)
            expectedQuestions.push(expectedQuestion)
        }

        mockHasFinishedAllQuestions
            .mockReturnValue(true)

        mockGetLeaderboard.mockReturnValue(fakeLeaderboard)
    })

    it('should publish questions every 10 seconds until the number of questions run out configuring a listener for processing the answers', async () => {      
        const { totalQuestions, leaderboard } = await runQuizRound()

        // TODO IT IS HANGING WITH JEST OPEN AT THE END AS ALTHOUGH WE'RE MOCKING THE ABLY REAL TIME CALL IS BEING MADE IN AN IMPORT

        expect(totalQuestions).toEqual(2)
        expect(leaderboard).toEqual(fakeLeaderboard)

        expect(mockSubscribe).toHaveBeenCalledTimes(1)
        expect(mockSubscribe).toHaveBeenCalledWith(QuizChannelName, 'answer', answerHandler)

        expect(mockPublish).toHaveBeenCalledTimes(testQuestionsLength)
        expectedQuestions.forEach((question) => {
            expect(mockPublish).toHaveBeenCalledWith(QuizChannelName, 'question', {
                currentQuestionIdx: question.currentQuestionIdx,
                question: question.question,
                answers: question.answers
            })
        })

        expect(mockSleep).toHaveBeenCalledTimes(Questions.length)
        expect(mockSleep).toHaveBeenCalledWith(10000)

        expect(mockUnsubscribe).toHaveBeenCalledTimes(1)
        expect(mockUnsubscribe).toHaveBeenCalledWith(QuizChannelName, 'answer')
    })
})