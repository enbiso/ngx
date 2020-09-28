import { Component, Input } from '@angular/core';

@Component({
    selector: 'ebs-core-page',
    template:
        `
    <div [ngClass]="{
            'page-layout carded': true, 
            'fullwidth': fullWidth, 
            'inner-scroll': innerScroll,
            'left-sidebar': leftSidebar
        }">
        <div class="top-bg accent"></div>
        <ng-content select="[sidebar]"></ng-content>
        <div class="center"> 
            <div [ngClass]="{'header accent': true}"
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
                <ng-content select="[contentTop]"></ng-content>
                <ng-content select="[content]"></ng-content>
            </div>
        </div>
        </div>
    `,
    styleUrls: ['./page.component.scss']
})

export class PageComponent {
    @Input() fullWidth: boolean
    @Input() innerScroll: boolean
    @Input() leftSidebar: boolean

    @Input() title?: string
    @Input() subTitle?: string
    @Input() backLink?: []
}