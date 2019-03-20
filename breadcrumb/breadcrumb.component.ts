import { Component } from '@angular/core';
import { Breadcrumb } from './breadcrumb.model';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
    selector: 'ebs-breadcrumb',
    templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

    breadcrumbs: Array<Breadcrumb> = [];
    
    constructor(breadscrumbService: BreadcrumbService) {
        breadscrumbService.observer$.subscribe(breadcrumbs => {
            this.breadcrumbs = breadcrumbs;
        })
    }
}