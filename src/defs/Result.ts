export type Result<T> = {
    success: boolean
    value?: T
    error?: string
}