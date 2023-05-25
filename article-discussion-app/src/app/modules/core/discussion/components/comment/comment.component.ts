import { AfterViewInit, Component, ElementRef, Input, ViewChild, EventEmitter, Output } from '@angular/core';

import { IComment } from 'src/app/modules/shared/interfaces/comment';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements AfterViewInit {
    @Input() comment!: IComment;
    @Output() commentIdEmmitter: EventEmitter<string> = new EventEmitter<string>();
    @Output() deletedCommentIdEmmitter: EventEmitter<string> = new EventEmitter<string>();
    @Output() editCommentIdEmmitter: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('commentRef') commentRef!: ElementRef;
    @ViewChild('optionsMenuIconRef') optionsMenuIconRef!: ElementRef;


    public CLIENT_ID: string = 'pd-12-4';

    ngAfterViewInit(): void {
        const commentElement = this.commentRef.nativeElement as HTMLElement;
        const optionsMenuIconElement = this.optionsMenuIconRef.nativeElement as HTMLElement;

        commentElement.onmouseenter = (): void => {
            //do not show menu icon when comment is deleted
            if (this.comment.isDeleted === false) {
                optionsMenuIconElement.style.display = "block";
            }
        }

        commentElement.onmouseleave = (): void => {
            optionsMenuIconElement.style.display = "none";
        }
    }

    public onDeleteComment(commentId: string): void {
        this.commentIdEmmitter.emit(commentId);
    }

    public onRestoreComment(commentId: string): void {
        this.deletedCommentIdEmmitter.emit(commentId);
    }

    public onEditComment(commentId: string): void {
        this.editCommentIdEmmitter.emit(commentId);
    }
}