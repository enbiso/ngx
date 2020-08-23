import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from './confirm.component';
import { Observable } from 'rxjs';
import { InputDialogModel, InputDialogComponent } from './input.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
    constructor(private dlg: MatDialog) { }

    public confirm(data: ConfirmDialogModel): Observable<boolean> {
        const dialogRef = this.dlg.open(ConfirmDialogComponent, {
            minWidth: "400px",
            data: data
        });
        return dialogRef.afterClosed();
    }

    public input(data: InputDialogModel): Observable<string> {
        const dialogRef = this.dlg.open(InputDialogComponent, {
            minWidth: "400px",
            data: data
        });
        return dialogRef.afterClosed();
    }
}