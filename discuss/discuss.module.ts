import { NgModule } from '@angular/core';
import { DiscussService } from './services/discuss.service';
import { DiscussComponent } from './components/discuss.component';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDialogModule } from '@angular/material';
import { PostCreateComponent } from './components/post-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule
    ],
    declarations: [
        PostCreateComponent,
        DiscussComponent
    ],
    exports: [DiscussComponent],
    providers: [DiscussService],
    entryComponents: [PostCreateComponent]
})
export class EbsDiscussModule { }
