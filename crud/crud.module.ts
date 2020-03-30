import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { DetailsComponent } from './components/details/details.component';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EbsCoreModule } from '@enbiso/core/core.module';
import { RouterModule } from '@angular/router';
import { SwaggerService } from './services';
import { PopulateKeyPipe } from './pipes/populate-key.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EbsCacheModule } from '../cache/cache.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StartCasePipe } from '../core/pipes/startcase.pipe';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxDatatableModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule,
        MatListModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        EbsCoreModule,
        EbsCacheModule,
        MatButtonModule,
        MatChipsModule
    ],
    exports: [
        ListComponent,
        FormComponent,
        DetailsComponent,
        HeaderComponent,
        PopulateKeyPipe
    ],
    declarations: [
        ListComponent,
        FormComponent,
        DetailsComponent,
        HeaderComponent,
        PopulateKeyPipe
    ],
    providers: [
        SwaggerService,
        PopulateKeyPipe,
        StartCasePipe
    ],
})
export class EbsCrudModule { }
