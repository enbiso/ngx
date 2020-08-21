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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

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
