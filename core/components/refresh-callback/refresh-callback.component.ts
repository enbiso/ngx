import { Component, OnInit } from '@angular/core';
import { UserManager } from 'oidc-client';

@Component({
    selector: 'ebs-core-refresh-callback',
    template: ``
})

export class RefreshCallbackComponent implements OnInit {
    constructor(private userManager: UserManager) { }

    ngOnInit() {
        this.userManager.signinSilentCallback().catch(err => console.log(err))
    }
}