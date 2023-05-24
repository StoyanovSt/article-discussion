import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-discussion',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements AfterViewInit {
    @ViewChild('textAreaRef') textAreaRef!: ElementRef;

    constructor() { }

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