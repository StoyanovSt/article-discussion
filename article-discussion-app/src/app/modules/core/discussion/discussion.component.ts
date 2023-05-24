import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { IComment } from '../../shared/interfaces/comment';

import * as uniqid from 'uniqid';

@Component({
    selector: 'app-discussion',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements AfterViewInit {
    @ViewChild('textAreaRef') textAreaRef!: ElementRef;

    private hardCodedMilliseconds: number[] = [
        5000000000,
        3000000000,
        1500000000,
    ];

    public comments: IComment[] = [
        {
            id: uniqid(),
            username: 'John Doe',
            avatar: '../../../../../assets/images/svg/avatar-1.svg',
            timestamp: new Date(Date.now() - this.hardCodedMilliseconds[0]),
            text: 'Incredible article!'
        },
        {
            id: uniqid(),
            username: 'Steve Peterson',
            avatar: '../../../../../assets/images/svg/avatar-2.svg',
            timestamp: new Date(Date.now() - this.hardCodedMilliseconds[1]),
            text: 'Awesome!'
        },
        {
            id: uniqid(),
            username: 'Brega Hutson',
            avatar: '../../../../../assets/images/svg/avatar-3.svg',
            timestamp: new Date(Date.now() - this.hardCodedMilliseconds[2]),
            text: 'It is so interesting topic to discuss.'
        }
    ];

    constructor(

    ) { }

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
    }

}