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

    private hardCodedMilliseconds: number[] = [
        1500000000,
        3000000000,
        5000000000,
    ];
    private deletedComments: {
        id: string,
        text: string,
    }[] = [];

    public sortingEnum: typeof CommentsSortingEnumeration = CommentsSortingEnumeration;

    public comments: IComment[] = [
        {
            id: uniqid(),
            userId: 'pd-12-1',
            username: 'John Doe',
            avatar: '../../../../../assets/images/svg/avatar-1.svg',
            timestamp: new Date(Date.now() - this.hardCodedMilliseconds[0]),
            text: `Let's save wild elephants!`,
            isDeleted: false,
        },
        {
            id: uniqid(),
            userId: 'pd-12-2',
            username: 'Steve Peterson',
            avatar: '../../../../../assets/images/svg/avatar-2.svg',
            timestamp: new Date(Date.now() - this.hardCodedMilliseconds[1]),
            text: 'Asian elephants are a keystone species and “gardeners of the planet.”',
            isDeleted: false,
        },
        {
            id: uniqid(),
            userId: 'pd-12-3',
            username: 'Brega Hutson',
            avatar: '../../../../../assets/images/svg/avatar-3.svg',
            timestamp: new Date(Date.now() - this.hardCodedMilliseconds[2]),
            text: 'It is so interesting topic to discuss.',
            isDeleted: false,
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

    public onLeavingAComment(): void {
        const comment: IComment = {
            id: uniqid(),
            userId: 'pd-12-4',
            username: '',
            avatar: '../../../../../assets/images/svg/avatar-4.svg',
            timestamp: new Date(),
            text: String(this.textAreaRef.nativeElement.value).trim(),
            isDeleted: false,
        }

        this.comments.push(comment);
        this.textAreaRef.nativeElement.value = '';
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
            }
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

                }

            }
        });
    }

    public onSortComments(sortingId: number): void {
        switch (sortingId) {
            case 0:
                //TO DO
                break;
            case 1:
                //TO DO
                break;
            case 2:
                this.comments.sort((a: IComment, b: IComment): number => {
                    return b.timestamp.toLocaleDateString().localeCompare(a.timestamp.toLocaleDateString());
                })
                break;
            case 3:
                this.comments.sort((a: IComment, b: IComment): number => {
                    return a.timestamp.toLocaleDateString().localeCompare(b.timestamp.toLocaleDateString());
                })
                break;
        }
    }

}