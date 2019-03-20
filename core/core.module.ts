import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService, AuthService, HttpService } from './services';
import * as cmp from './components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import * as Mat from '@angular/material';
import { KeysPipe } from './pipes/keys.pipe';
import { StartCasePipe } from './pipes/startcase.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

const routes = [
    {
        path: 'auth-callback',
        component: cmp.AuthCallbackComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        Mat.MatDialogModule,
        Mat.MatProgressSpinnerModule,
        Mat.MatProgressBarModule,
        Mat.MatChipsModule,
        Mat.MatFormFieldModule,        
        Mat.MatButtonModule,
        FlexLayoutModule,
        FormsModule,
        Mat.MatIconModule,
        AutosizeModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        KeysPipe,
        StartCasePipe,
        cmp.CardPageComponent,
        cmp.MultiInputComponent,
        cmp.ObjectInputComponent,        
    ],
    declarations: [
        cmp.AuthCallbackComponent,
        cmp.CardPageComponent,
        cmp.MultiInputComponent,
        cmp.ObjectInputComponent,        
        KeysPipe,
        StartCasePipe
    ],
    providers: [
        AuthGuardService,
        AuthService,
        HttpService
    ]
})
export class EbsCoreModule { }
