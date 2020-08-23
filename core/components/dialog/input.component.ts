import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ebs-core-input',
    template: `
<div mat-dialog-content>        
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field fxFlex>
            <mat-label>{{title}}</mat-label>
            <input [placeholder]="title" matInput formControlName="input">
            <mat-hint>{{message}}</mat-hint>
        </mat-form-field>            
    </form>
</div>
<div mat-dialog-actions align="end" class="mb-4">
    <button mat-button (click)="onDismiss()">Cancel</button>
    <button mat-raised-button color="accent" [disabled]="!form.valid" (click)="onSubmit()">Submit</button>
</div>
    `,
    styles: [`
mat-form-field {
    height: 100px;
}
        `]
})

export class InputDialogComponent {
    title: string;
    message: string;
    form: FormGroup

    constructor(fb: FormBuilder,
        public dialogRef: MatDialogRef<InputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: InputDialogModel) {
        this.title = data.title;
        this.message = data.message;
        this.form = fb.group({
            input: [data.prefill, [Validators.required]]
        })
    }

    onSubmit(): void {
        if (!this.form.valid) return
        this.dialogRef.close(this.form.value.input);
    }

    onDismiss(): void {
        this.dialogRef.close(null);
    }
}

export class InputDialogModel {
    constructor(public title: string, public message: string, public prefill?: string) { }
}