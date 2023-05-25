export interface IComment {
    id: string,
    userId: string,
    username: string,
    avatar: string,
    timestamp: Date,
    text: string,
    isDeleted: boolean,
    replies: IComment[]
}