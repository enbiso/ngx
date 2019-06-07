import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs/operators';

@Component({
    selector: 'ebs-core-auth-callback',
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
    error: string
    tokenTime: number
    nowTime: number

    constructor(
        private router: Router,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.error = null
        this.authService.completeSignIn().then(_ => {
            this.router.navigateByUrl("/")
        }, (err: Error) => {
            this.error = err.message
            if (this.error.startsWith("iat is in the future:")) {
                this.tokenTime = parseInt(this.error.split(":")[1]) * 1000
                this.nowTime = Date.now()
            }
        });
    }
}