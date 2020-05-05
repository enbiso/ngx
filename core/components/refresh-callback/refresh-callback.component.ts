import { Component, OnInit } from '@angular/core';
import { AuthService } from '@enbiso/core/services';

@Component({
    selector: 'ebs-core-refresh-callback',
    template: ``
})

export class RefreshCallbackComponent implements OnInit {
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.completeRefresh().subscribe(_ => {
        }, (err: Error) => {
            console.log(err)
        });
    }
}