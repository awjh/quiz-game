import { Types } from "ably";
import { getChannel } from "./channels";

export function unsubscribe<Messages extends {[s: string]: Types.Message}>(
    channelName: string,
    eventName: keyof Messages
): void {
    const channel = getChannel(channelName)

    channel.unsubscribe(eventName as string)
}