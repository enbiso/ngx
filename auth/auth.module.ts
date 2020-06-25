import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './services';
import { AuthCallbackComponent, RefreshCallbackComponent } from './components';
import { EbsCoreModule } from '@enbiso/core/core.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/effects';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

const routes = [
    {
        path: 'auth-callback',
        component: AuthCallbackComponent
    },
    {
        path: 'refresh-callback',
        component: RefreshCallbackComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        EbsCoreModule,
        HttpClientModule,

        MatDialogModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatChipsModule,
        MatFormFieldModule,
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,

        RouterModule.forChild(routes),
        StoreModule.forFeature("auth", authReducer),
        EffectsModule.forFeature([AuthEffects])
    ],
    declarations: [
        AuthCallbackComponent,
        RefreshCallbackComponent,
    ],
    providers: [
        AuthGuardService
    ]
})
export class EbsAuthModule { }
