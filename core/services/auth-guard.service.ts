import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

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
        return this.authService.loggedIn().pipe(mergeMap(loggedIn => {
            if (loggedIn) return of(true)
            else this.authService.startSignIn().pipe(map(_ => false))
        })).toPromise()
    }
}
