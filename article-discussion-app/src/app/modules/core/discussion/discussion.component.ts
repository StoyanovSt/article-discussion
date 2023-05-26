import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { IComment } from '../../shared/interfaces/comment';
import CommentsSortingEnumeration from '../../shared/enums/comments-sorting.enum';

import * as uniqid from 'uniqid';

@Component({
    selector: 'app-discussion',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements AfterViewInit {
    @ViewChild('textAreaRef') textAreaRef!: ElementRef;

    private hardcodedMilliseconds: number[] = [
        1500000000,
        3000000000,
        5000000000,
        60000000,
        4000000,
    ];
    private hardcodedHeadCommentsIds: string[] = [
        'rx-2-fe432',
        'rx-3-fe435',
        'ry-4-fe437',
        'rq-5-fe434',
    ];
    private deletedComments: {
        id: string,
        text: string,
    }[] = [];
    private commentForEditing: IComment | undefined;
    private commentForReplying: IComment | undefined;

    public sortingEnum: typeof CommentsSortingEnumeration = CommentsSortingEnumeration;

    public comments: IComment[] = [
        {
            id: this.hardcodedHeadCommentsIds[0],
            userId: 'pd-12-1',
            username: 'John Doe:',
            avatar: '../../../../../assets/images/svg/avatar-1.svg',
            timestamp: new Date(Date.now() - this.hardcodedMilliseconds[0]),
            text: `Let's save wild elephants!`,
            isDeleted: false,
            isEdited: false,
            replies: [{
                id: uniqid(),
                userId: 'pd-12-2',
                username: 'Steve Peterson:',
                avatar: '../../../../../assets/images/svg/avatar-2.svg',
                timestamp: new Date(Date.now() - this.hardcodedMilliseconds[3]),
                text: 'Yeah!',
                isDeleted: false,
                isEdited: false,
                replies: []
            }, {
                id: uniqid(),
                userId: 'pd-12-3',
                username: 'Brega Hutson:',
                avatar: '../../../../../assets/images/svg/avatar-3.svg',
                timestamp: new Date(Date.now() - this.hardcodedMilliseconds[4]),
                text: 'Alright!',
                isDeleted: false,
                isEdited: false,
                replies: []
            }]
        },
        {
            id: this.hardcodedHeadCommentsIds[1],
            userId: 'pd-12-2',
            username: 'Steve Peterson:',
            avatar: '../../../../../assets/images/svg/avatar-2.svg',
            timestamp: new Date(Date.now() - this.hardcodedMilliseconds[1]),
            text: 'Asian elephants are a keystone species and “gardeners of the planet.”',
            isDeleted: false,
            isEdited: false,
            replies: []
        },
        {
            id: this.hardcodedHeadCommentsIds[2],
            userId: 'pd-12-3',
            username: 'Brega Hutson:',
            avatar: '../../../../../assets/images/svg/avatar-3.svg',
            timestamp: new Date(Date.now() - this.hardcodedMilliseconds[2]),
            text: 'It is so interesting topic to discuss.',
            isDeleted: false,
            isEdited: false,
            replies: []
        }
    ];

    constructor(

    ) {

    }

    ngAfterViewInit(): void {
        (this.textAreaRef.nativeElement as HTMLElement).focus();
    }

    public onFocusInTextArea(textAreaRef: any): void {
        (textAreaRef as HTMLElement).classList.add('focused');
    }

    public onFocusOutTextArea(textAreaRef: any): void {
        (textAreaRef as HTMLElement).classList.remove('focused');
    }

    public onPushComment(): void {
        //if user tries to enter an empty string
        if (!this.getCommentTextAreaValue()) {
            this.clearCommentTextArea();
            return;
        }

        if (this.commentForReplying?.id) {
            //reply to comment
            this.comments.forEach((c: IComment) => {
                if (c.id === this.commentForReplying?.id) {
                    c.replies.push(this.createAReplyComment(c.id));
                    this.clearCommentTextArea();
                }
            });
            this.commentForReplying = undefined;
            return;
        }

        let isCommentEdited = false;

        for (let i = 0; i < this.comments.length; i++) {
            if (this.comments[i].id === this.commentForEditing?.id) {
                //edit comment
                this.comments[i] = {
                    ...this.comments[i],
                    text: this.getCommentTextAreaValue(),
                    isEdited: true
                };

                isCommentEdited = true;
                this.commentForEditing = undefined;
                break;
            }

            if (this.comments[i].replies.length > 0) {
                for (let j = 0; j < this.comments[i].replies.length; j++) {
                    if (this.comments[i].replies[j].id === this.commentForEditing?.id) {
                        //edit reply comment
                        this.comments[i].replies[j] = {
                            ...this.comments[i].replies[j],
                            text: this.getCommentTextAreaValue(),
                            isEdited: true
                        };

                        isCommentEdited = true;
                        this.commentForEditing = undefined;
                        break;
                    }
                }

                if (isCommentEdited) {
                    break;
                }
            }

        }

        if (isCommentEdited) {
            this.clearCommentTextArea();
            return;
        }

        //if comment is newly created
        this.postNewComment();

        this.clearCommentTextArea();
    }

    public onDeleteComment(commentId: string): void {
        this.comments.forEach((c: IComment) => {
            if (c.id === commentId) {
                this.deletedComments.push({
                    id: c.id,
                    text: c.text,
                });
                c.text = 'This message has been deleted.';
                c.isDeleted = true;
                return;
            }

            c.replies.forEach((reply: IComment) => {
                if (reply.id === commentId) {
                    this.deletedComments.push({
                        id: reply.id,
                        text: reply.text,
                    });
                    reply.text = 'This message has been deleted.';
                    reply.isDeleted = true;
                    return;
                }
            });

        });

    }

    public onRestoreComment(commentId: string): void {
        this.comments.forEach((c: IComment) => {
            if (c.id === commentId) {
                const deletedComment = this.deletedComments.find(x => x.id === c.id);

                if (deletedComment) {
                    c.text = deletedComment.text;
                    c.isDeleted = false;
                    this.deletedComments = this.deletedComments.filter(x => x.id !== c.id);
                    return;
                }

            }

            c.replies.forEach((reply: IComment) => {
                if (reply.id === commentId) {
                    const deletedComment = this.deletedComments.find(x => x.id === reply.id);

                    if (deletedComment) {
                        reply.text = deletedComment.text;
                        reply.isDeleted = false;
                        this.deletedComments = this.deletedComments.filter(x => x.id !== reply.id);
                        return;
                    }
                }
            });

        });
    }

    public onEditComment(commentId: string): void {
        let comment;

        this.comments.forEach((c: IComment) => {
            if (c.id === commentId) {
                comment = c;
                this.focusCommentTextArea(comment);
                this.commentForEditing = comment;
                return;
            }

            comment = c.replies.find((reply: IComment) => reply.id === commentId);

            if (comment) {
                this.focusCommentTextArea(comment);
                this.commentForEditing = comment;
                return;
            }

        });

    }

    public onReplyToComment(commentId: string): void {
        const comment = this.comments.find((c: IComment) => c.id === commentId);

        if (comment) {
            this.commentForReplying = comment;
            this.textAreaRef.nativeElement.focus();
        }

    }

    public onSortComments(sortingId: number): void {
        switch (sortingId) {
            case 0:
                this.sortCommentsByRepliesAsc();
                break;
            case 1:
                this.sortCommentsByRepliesDesc();
                break;
            case 2:
                this.sortCommentsByDateAsc();
                break;
            case 3:
                this.sortCommentsByDateDesc();
                break;
        }
    }

    private sortCommentsByRepliesAsc(): void {
        this.comments.sort((a: IComment, b: IComment): number => {
            if (a.replies.length > b.replies.length) {
                return 1;
            } else if (b.replies.length > a.replies.length) {
                return -1;
            }

            return 0;
        })
    }

    private sortCommentsByRepliesDesc(): void {
        this.comments.sort((a: IComment, b: IComment): number => {
            if (b.replies.length > a.replies.length) {
                return 1;
            } else if (a.replies.length > b.replies.length) {
                return -1;
            }

            return 0;
        })
    }

    private sortCommentsByDateAsc(): void {
        this.comments.sort((a: IComment, b: IComment): number => {
            return a.timestamp.toLocaleDateString().localeCompare(b.timestamp.toLocaleDateString());
        })
    }

    private sortCommentsByDateDesc(): void {
        this.comments.sort((a: IComment, b: IComment): number => {
            return b.timestamp.toLocaleDateString().localeCompare(a.timestamp.toLocaleDateString());
        })
    }

    private postNewComment(): void {
        const comment: IComment = {
            id: this.hardcodedHeadCommentsIds[3],
            userId: 'pd-12-4',
            username: 'Me:',
            avatar: '../../../../../assets/images/svg/avatar-4.svg',
            timestamp: new Date(),
            text: this.getCommentTextAreaValue(),
            isDeleted: false,
            isEdited: false,
            replies: []
        }

        this.comments.push(comment);
    }

    private clearCommentTextArea(): void {
        this.textAreaRef.nativeElement.value = '';
    }

    private createAReplyComment(parentCommentId: string): IComment {
        return {
            id: uniqid(),
            userId: 'pd-12-4',
            parentCommentId,
            isReplyComment: true,
            username: 'Me:',
            avatar: '../../../../../assets/images/svg/avatar-4.svg',
            timestamp: new Date(),
            text: this.getCommentTextAreaValue(),
            isDeleted: false,
            isEdited: false,
            replies: []
        }
    }

    private focusCommentTextArea(comment: IComment): void {
        this.textAreaRef.nativeElement.focus();
        this.setCommentTextAreaValue(comment);
    }

    private setCommentTextAreaValue(comment: IComment): void {
        this.textAreaRef.nativeElement.value = comment.text;
    }

    private getCommentTextAreaValue(): string {
        return String(this.textAreaRef.nativeElement.value).trim();
    }

}