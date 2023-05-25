import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { IComment } from 'src/app/modules/shared/interfaces/comment';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements AfterViewInit {
    @Input() comment!: IComment;
    @ViewChild('commentRef') commentRef!: ElementRef;

    public showOptionsMenu: boolean = false;

    ngAfterViewInit(): void {
        const commentElement = this.commentRef.nativeElement as HTMLElement;

        commentElement.onmouseenter = (): void => {
            this.showOptionsMenu = true;
        }

        commentElement.onmouseleave = (): void => {
            this.showOptionsMenu = false;
        }
    }
}