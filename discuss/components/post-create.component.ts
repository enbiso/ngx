import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscussPostResponse, DiscussService, DiscussPostCreate } from '../services/discuss.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { of, Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

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

    post: DiscussPostResponse = <DiscussPostResponse>{}
    discuss: string
    id: string
    fileToUpload: File

    FILE_ATTACHMENT_TYPES: string[] = ["file", "image"]

    fileUploadHandler: FileUploadHandler

    constructor(
        private api: DiscussService,
        private dlg: MatDialog,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.post = data && data.post || this.post
        this.discuss = data && data.discuss
        this.id = data && data.id
        this.fileUploadHandler = data && data.fileUpload
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
    }

    onSubmit() {
        if (!this.form.valid || this.form.disabled) return
        this.form.disable()

        let req = <DiscussPostCreate>this.form.value
        if (req.attachment.type == null)
            req.attachment = null

        of(req).pipe(mergeMap(post => {
            if (post.attachment && this.FILE_ATTACHMENT_TYPES.indexOf(post.attachment.type) >= 0 && this.fileUploadHandler)
                return this.fileUploadHandler(this.fileToUpload).pipe(map(uploadUrl => {
                    post.attachment.uri = uploadUrl
                    post.attachment.name = this.fileToUpload.name
                    return post
                }))
            else
                return of(post)
        })).pipe(mergeMap(post => {
            if (this.post.id)
                return this.api.updatePost(this.discuss, this.post.id, post)
            else
                return this.api.addPost(this.discuss, post)
        })).subscribe(_ => {
            this.dlg.getDialogById(this.id).close()
        })
    }
}

export type FileUploadHandler = (file: File) => Observable<string>