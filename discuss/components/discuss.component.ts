import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DiscussService, DiscussPostQueryModel } from '../services/discuss.service';

@Component({
    selector: 'ebs-discuss',
    template: `
<mat-card *ngFor="let post of posts">
    <mat-card-header>
        <mat-card-title>{{post.postedBy}}</mat-card-title>
        <mat-card-subtitle>{{post.created | date}}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
        <p>{{post.content}}</p>
    </mat-card-content>
</mat-card>
    `
})

export class DiscussComponent implements OnInit, OnChanges {

    @Input() id: string
    posts: DiscussPostQueryModel[] = []

    constructor(
        private api: DiscussService
    ) { }

    ngOnInit() {
        if (this.id)
            this.api.listPosts(this.id).subscribe(posts => this.posts = posts)
    }
    ngOnChanges() {
        this.ngOnInit()
    }
}