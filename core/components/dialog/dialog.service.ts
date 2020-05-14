import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from './confirm.component';
import { Observable } from 'rxjs';

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
}