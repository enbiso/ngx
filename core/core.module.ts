import { corePipes } from './pipes/index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as cmp from './components';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { RouterModule } from '@angular/router';
import { FuseSidebarModule } from '@fuse/components';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        //NG
        CommonModule,
        RouterModule,
        HttpClientModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        //MAT
        MatDialogModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatChipsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        //FUSE
        FuseSidebarModule,
        //LIB
        AutosizeModule,
        QuillModule.forRoot()
    ],
    exports: [
        [...corePipes],
        cmp.PageComponent,
        cmp.CardPageComponent,
        cmp.SidebarPageComponent,
        cmp.MultiInputComponent,
        cmp.ObjectInputComponent,
        cmp.SpinnerComponent,
        cmp.RichEditorComponent,
        cmp.RichViewerComponent,
    ],
    declarations: [
        [...corePipes],
        cmp.PageComponent,
        cmp.CardPageComponent,
        cmp.SidebarPageComponent,
        cmp.MultiInputComponent,
        cmp.ObjectInputComponent,
        cmp.SpinnerComponent,
        cmp.RichEditorComponent,
        cmp.RichViewerComponent,
        cmp.ConfirmDialogComponent,
        cmp.InputDialogComponent
    ],
    entryComponents: [cmp.ConfirmDialogComponent],
})
export class EbsCoreModule { }
