import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DiscussPostResponse } from '../services/discuss.service';

@Component({
    selector: 'ebs-discuss-post',
    template: `
<mat-card class="m-8">
    <mat-card-title-group fxLayout="column">
        <mat-card-title fxFlex class="postedBy">{{post.postedByName || "..."}}</mat-card-title>
        <mat-card-subtitle fxFlex class="created">{{post.created | date:'MMM d, y - h:mm a'}}</mat-card-subtitle>
    </mat-card-title-group>
    <img *ngIf="isAttachment('image')" mat-card-image 
        [src]="post.attachment.uri" alt="Post Image">
    <mat-card-content>
        <p>{{post.content}}</p>
    </mat-card-content>
    <mat-card-actions *ngIf="isAttachment('link', 'file')">
        <button mat-button (click)="onClickAttachment(post.attachment.uri)">{{post.attachment.name || post.attachment.uri}}</button>
    </mat-card-actions>
</mat-card>
    `,
    styles: [`
        .postedBy {
            font-size: 14px;
        }
        .created {
            font-size: 12px;
            text-align: right;
            margin-right: 10px;
        }
        `]
})

export class PostComponent {
    @Input() post: DiscussPostViewModel
    @Output() download = new EventEmitter<string>();

    isAttachment(...types: string[]): boolean {
        return this.post
            && this.post.attachment
            && this.post.attachment.uri
            && types.indexOf(this.post.attachment.type) >= 0
    }

    onClickAttachment(uri: string) {
        this.download.next(uri)
    }
}

export interface DiscussPostViewModel extends DiscussPostResponse {
    postedByName: string
}