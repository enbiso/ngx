import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscussPostQueryModel, DiscussService } from '../services/discuss.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
    selector: 'ebs-discuss-post-create',
    template: `
    <form fxLayout="column" [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field fxFlex>
            <textarea matInput rows="5" formControlName="content" placeholder="Content"></textarea>
        </mat-form-field>
        <button mat-flat-button color="accent">{{post.id && 'Update' || 'Post'}}</button>
    </form>    
`
})

export class PostCreateComponent implements OnInit {
    form: FormGroup

    post: DiscussPostQueryModel = <DiscussPostQueryModel>{}
    discuss: string
    id: string

    constructor(
        private api: DiscussService,
        private dlg: MatDialog,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.post = data && data.post || this.post
        this.discuss = data && data.discuss
        this.id = data && data.id
    }

    ngOnInit() {
        this.form = this.fb.group({
            content: [this.post.content, [Validators.required]],
        })
    }

    onSubmit() {
        if (this.form.valid) {
            if (this.post.id)
                this.api.updatePost(this.discuss, this.post.id, this.form.value).subscribe(_ => {
                    this.dlg.getDialogById(this.id).close()
                })
            else
                this.api.addPost(this.discuss, this.form.value).subscribe(_ => {
                    this.dlg.getDialogById(this.id).close()
                })
        }
    }
}