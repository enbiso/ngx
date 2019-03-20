import { Component, Input, OnChanges } from '@angular/core';
import { Action, ResourceModel } from '../../models';

@Component({
    selector: 'ebs-crud-header',
    template: `
    <div header fxLayout="row" fxLayoutAlign="space-between center">
    <ng-container *ngFor="let action of actions">
        <a mat-button *ngIf="action" [routerLink]="base + (action.link | populateKey:data:model?.properties)">
            {{action.display | uppercase}}
        </a>
    </ng-container>
    </div>
    `
})
export class HeaderComponent implements OnChanges{
    @Input() actions: Action[]
    @Input() model: ResourceModel
    @Input() data: any
    @Input() base: string = ""

    constructor() { }

    ngOnChanges(): void {
        if(this.model && this.data) {
            this.actions = this.model['x-action']
        }   
    }
}
