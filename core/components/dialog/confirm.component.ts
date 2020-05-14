import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'ebs-core-confirm',
    template: `
<div mat-dialog-content>
    <div class="mat-title">{{title}}</div>
    <div class="mat-subheading-1">{{message}}</div>
</div>
<div mat-dialog-actions align="end" class="mb-4">
    <button mat-button (click)="onDismiss()">No</button>
    <button mat-raised-button color="accent" (click)="onConfirm()">Yes</button>
</div>
    `
})

export class ConfirmDialogComponent {
    title: string;
    message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
        this.title = data.title;
        this.message = data.message;
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}

export class ConfirmDialogModel {
    constructor(public title: string, public message: string) { }
}