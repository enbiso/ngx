import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
    selector: 'ebs-core-auth-callback',
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {        
    error: string;
    constructor(
        private router: Router,        
        private authService: AuthService) {
    }
    ngOnInit() {           
        this.error = null;     
        this.authService.completeSignIn().then(_ => {
            this.router.navigateByUrl("/");
        }, _ => {
            this.error = _;
        });        
    }
}