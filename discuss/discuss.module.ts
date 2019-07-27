import { NgModule } from '@angular/core';
import { DiscussService } from './services/discuss.service';
import { PostComponent } from './components/post.component';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDialogModule, MatIconModule } from '@angular/material';
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
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule
    ],
    declarations: [
        PostCreateComponent,
        PostComponent
    ],
    exports: [PostComponent],
    providers: [DiscussService],
    entryComponents: [PostCreateComponent]
})
export class EbsDiscussModule { }
