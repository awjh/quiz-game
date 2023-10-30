import { Types } from "ably"
import { QuizChannelName } from "../constants/QuizChannelName"
import { getChannel } from "./channels"
import { publish } from "./publish"

jest.mock('./channels')

describe('publish', () => {
    const mockGetChannel = getChannel as jest.MockedFn<typeof getChannel>
    const mockPublish = jest.fn()

    beforeEach(() => {
        jest.resetAllMocks()

        mockGetChannel.mockReturnValue({
            publish: mockPublish
        } as unknown as Types.RealtimeChannelCallbacks)
    })

    it('should publish the given data to the channel name provided', () => {
        publish(QuizChannelName, 'someEvent', {some: 'data'})

        expect(mockGetChannel).toHaveBeenCalledWith(QuizChannelName)
        expect(mockPublish).toHaveBeenCalledWith('someEvent', {some: 'data'})
    })
})