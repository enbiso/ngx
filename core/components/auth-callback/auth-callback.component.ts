import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

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
        this.authService.completeSignIn().subscribe(_ => {
            this.router.navigateByUrl("/")
        }, (err: Error) => {
            this.error = err.message
            if (this.error.startsWith("iat is in the future:") || this.error.startsWith("exp is in the past:")) {
                this.tokenTime = parseInt(this.error.split(":")[1]) * 1000
                this.nowTime = Date.now()
            }
        });
    }
}