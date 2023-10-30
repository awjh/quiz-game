export async function sleep(duration: number) {
    return new Promise((res) => {
        setTimeout(() => res(null), duration)
    })
}