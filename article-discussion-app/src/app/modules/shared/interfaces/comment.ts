export interface IComment {
    id: string,
    isReplyComment?: boolean,
    parentCommentId?: string,
    userId: string,
    username: string,
    avatar: string,
    timestamp: Date,
    text: string,
    isDeleted: boolean,
    isEdited: boolean,
    replies: IComment[]
}