import { Component, Input } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector: 'ebs-core-sidebar-page',
    template:
        `
<ebs-core-page 
    [title]="title" 
    [subTitle]="subTitle" 
    [backLink]="backLink" 
    [innerScroll]="true" 
    [leftSidebar]="true">
    <fuse-sidebar sidebar class="sidebar" name="sidebar-page" position="left" lockedOpen="gt-md">        
        <div class="header p-24 accent">
            <ng-content select="[sidebarHeader]"></ng-content>        
        </div>
        <div class="content">
            <ng-content select="[sidebarContent]"></ng-content>        
        </div>
    </fuse-sidebar> 
    <div contentTop class="toolbar px-24 py-8">
        <button mat-icon-button class="sidebar-toggle" fxHide.gt-md
                (click)="toggleSidebar('sidebar-page')">
            <mat-icon>menu</mat-icon>
        </button>
        <span>{{contentTitle}}</span>
    </div>
    <ng-content content select="[content]"></ng-content>
    <ng-content header select="[header]"></ng-content>
</ebs-core-page>
`,
    styles: [`:host {width: 100%}`]
})

export class SidebarPageComponent {
    @Input() title?: string
    @Input() subTitle?: string
    @Input() contentTitle?: string
    @Input() backLink?: []

    constructor(private _fuseSidebarService: FuseSidebarService) {
    }

    toggleSidebar(name: string) {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}