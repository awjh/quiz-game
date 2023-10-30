import Ably from 'ably'
import { Result } from '../defs/Result'

let realtime: Ably.Realtime

function connectRealtime() {
    realtime = new Ably.Realtime({
        echoMessages: false,
        key: 'QNKh4g.wGQkYg:yMt1WvT5fl7LG9ZYBfikJnm0WIXBuQ3T1aMDx8YitpE'
    })
}

const channels: {[s: string]: Ably.Types.RealtimeChannelCallbacks } = {}

export async function instantiateChannel(name: string): Promise<Result<Ably.Types.RealtimeChannelCallbacks>> {
    const channel = await getChannel(name)
    
    return new Promise((resolve) => {
        channel.attach((err) => {
            if (err) {
                resolve({
                    success: false,
                    error: `Failed to instantiate ${name} channel. ERROR: ${err.message}`
                })
                return
            }

            resolve({
                success: true,
                value: channel
            })
        })
    })
}

export function getChannel(name: string): Ably.Types.RealtimeChannelCallbacks {
    if(!realtime) {
        connectRealtime()
    }

    if(channels[name]) {
        return channels[name]
    }

    const channel = realtime.channels.get(name)

    return channel
}