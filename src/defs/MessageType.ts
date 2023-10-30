import { Types } from "ably"

export type MessageType<T> = Omit<Types.Message, 'data'> & {
    data: T
}
