import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [BreadcrumbComponent],
    declarations: [BreadcrumbComponent],
    providers: [BreadcrumbService],
})
export class EbsBreadcrumbModule { }
