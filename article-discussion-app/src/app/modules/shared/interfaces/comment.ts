export interface IComment {
    id: string,
    userId: string,
    username: string,
    avatar: string,
    timestamp: Date | string,
    text: string,
    isDeleted: boolean
}