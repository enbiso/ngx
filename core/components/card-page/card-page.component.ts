import { Component, Input } from '@angular/core';

@Component({
    selector: 'ebs-core-card-page',
    template:
        `
    <div class="page-layout carded fullwidth inner-scroll">
        <div class="top-bg accent"></div>
        <div class="center">
            <div class="header accent" 
                fxLayout="column" fxLayoutAlign="center center" 
                fxLayout.gt-xs="row" fxLayoutAlign.gt-xs="space-between center">

                <div fxLayout="row" fxLayoutAlign="start center">
                    <a *ngIf="backLink" mat-icon-button class="mr-0 mr-sm-16" [routerLink]="backLink">
                        <mat-icon>arrow_back</mat-icon>
                    </a>
                    <div fxLayout="column" fxLayoutAlign="start start" class="p-8">
                        <div class="h2" *ngIf="title">
                            {{title}}
                        </div>
                        <div class="subtitle secondary-text" *ngIf="subTitle">
                            <span>{{subTitle}}</span>
                        </div>
                    </div>
                </div>
                <ng-content select="[header]"></ng-content>
            </div>
            <div class="content-card mat-white-bg">
                <ng-content select="[content]"></ng-content>
            </div>
        </div>
        </div>
    `,
    styleUrls: ['./card-page.component.scss']
})

export class CardPageComponent {
    @Input() title?: string
    @Input() subTitle?: string
    @Input() backLink?: []
}