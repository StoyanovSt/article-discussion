import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';

import { DiscussionComponent } from './discussion/discussion.component';
import { CommentComponent } from './discussion/components/comment/comment.component';
import { CommentReplyComponent } from './discussion/components/comment/comment-reply/comment-reply.component';

@NgModule({
    declarations: [
        DiscussionComponent,
        CommentComponent,
        CommentReplyComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatMenuModule
    ],
    exports: [
        DiscussionComponent,
        CommentComponent,
        CommentReplyComponent
    ]
})
export class CoreModule { }
