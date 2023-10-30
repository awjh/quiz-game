import { Types } from "ably";
import { getChannel } from "./channels";

export function subscribe<Messages extends {[s: string]: Types.Message}, EventName extends keyof Messages>(
    channelName: string,
    eventName: EventName,
    handler: (message: Messages[EventName]) => void
): void {
    const channel = getChannel(channelName)

    channel.subscribe(eventName as string, handler as (message: Types.Message) => void)
}