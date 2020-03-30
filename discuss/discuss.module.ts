import { NgModule } from '@angular/core';
import { DiscussService } from './services/discuss.service';
import { PostComponent } from './components/post.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PostCreateComponent } from './components/post-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
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
