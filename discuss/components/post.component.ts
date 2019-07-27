import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DiscussService, DiscussPostQueryModel } from '../services/discuss.service';
import { style } from '@angular/animations';

@Component({
    selector: 'ebs-discuss-post',
    template: `
<mat-card class="m-8">
    <mat-card-title-group fxLayout="column">
        <mat-card-title fxFlex class="postedBy">{{post.postedByName || "..."}}</mat-card-title>
        <mat-card-subtitle fxFlex class="created">{{post.created | date:'MMM d, y - h:mm a'}}</mat-card-subtitle>
    </mat-card-title-group>
    <mat-card-content>
        <p>{{post.content}}</p>
    </mat-card-content>
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
}

export interface DiscussPostViewModel extends DiscussPostQueryModel {
    postedByName: string
}