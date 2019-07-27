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
        <div formGroupName="attachment" fxFlex fxLayout="column">
            <mat-form-field fxFlex>
                <mat-select formControlName="type" placeholder="Attachment Type">
                    <mat-option [value]="null">None</mat-option>  
                    <mat-option value="file">File</mat-option>
                    <mat-option value="link">Link</mat-option>
                    <mat-option value="image">Image</mat-option>
                </mat-select>
            </mat-form-field>
            <mat-form-field fxFlex *ngIf="form.value.attachment.type == 'link'">
                <input matInput formControlName="uri" placeholder="Link Url"/>
            </mat-form-field>
            <div fxFlex *ngIf="form.value.attachment.type && form.value.attachment.type != 'link'">
                <button type="button" mat-flat-button (click)="fileInput.click()">{{fileToUpload && fileToUpload.name || 'Choose File'}}</button>
                <input hidden (change)="handleFileInput($event.target.files)" #fileInput type="file">
                <br/><br/>
            </div>
        </div>
        <button mat-flat-button [disabled]="form.disabled" color="accent">{{post.id && 'Update' || 'Post'}}</button>
    </form>    
`
})

export class PostCreateComponent implements OnInit {
    form: FormGroup

    post: DiscussPostQueryModel = <DiscussPostQueryModel>{}
    discuss: string
    id: string
    fileToUpload: File

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
            attachment: this.fb.group({
                type: [this.post.attachment && this.post.attachment.type],
                uri: [this.post.attachment && this.post.attachment.uri]
            })
        })
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0)
        console.log(this.fileToUpload)
    }

    onSubmit() {
        if (!this.form.valid || this.form.disabled) return
        this.form.disable()

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