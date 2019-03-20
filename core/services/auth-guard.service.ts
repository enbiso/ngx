import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    /**
     * Constrcutor
     * @param authService Auth service
     */
    constructor(private authService: AuthService) { }

    /**
     * Can activate function which check the auth guard
     */
    async canActivate(): Promise<boolean> {
        let loggedInFlag = await this.authService.loggedIn();
        if (loggedInFlag) {
            return true;
        } else {
            this.authService.startSignIn();
            return false;
        }
    }
}
