import { Types } from "ably";
import { getChannel } from "./channels";

export function publish<Messages extends {[s: string]: Types.Message}, EventName extends keyof Messages>(
    channelName: string,
    eventName: EventName,
    data: Messages[EventName]['data']
): void {
    const channel = getChannel(channelName)

    channel.publish(eventName, data)
}