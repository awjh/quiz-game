import { Result } from "../../defs/Result"

export type User = {
    username: string,
    participantId: string,
    points: number
}

const users: User[] = []

export function resetUsers() {
    users.splice(0, users.length)
}

export function addUser({username, participantId}: Omit<User, 'points'>): Result<number> {
    if(users.some(({username: existingUserName}) => username === existingUserName)) {
        return {
            success: false,
            error: 'Username already taken'
        }
    }
    
    users.push({
        username,
        participantId,
        points: 0
    })

    return {
        success: true,
        value: users.length
    }
}

export function getNumCurrentUsers() {
    return users.length
}

export function getLeaderboard(): Omit<User, 'participantId'>[] {
    return users.map(({username, points}) => ({
        username,
        points,
    })).sort((a, b) => a.points > b.points ? -1 : 1)
}

export function incrementUserScore(by: number, participantId: string): Result<number> {
    const userWithParticipantId = users.find((user) => user.participantId === participantId)

    if (!userWithParticipantId) {
        return {
            success: false,
            error: `No user found with participant id ${participantId}`
        }
    }

    userWithParticipantId.points += by

    return {
        success: true,
        value: userWithParticipantId.points
    }
}