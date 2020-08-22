import { Component, Input } from '@angular/core';

@Component({
    selector: 'ebs-core-card-page',
    template:
        `
        <ebs-core-page 
            [title]="title" 
            [subTitle]="subTitle" 
            [backLink]="backLink" 
            [innerScroll]="true" 
            [fullWidth]="true">            
            <ng-content content select="[content]"></ng-content>
            <ng-content header select="[header]"></ng-content>
        </ebs-core-page>
    `,
    styles: [`:host {width: 100%}`]
})

export class CardPageComponent {
    @Input() title?: string
    @Input() subTitle?: string
    @Input() backLink?: []
}