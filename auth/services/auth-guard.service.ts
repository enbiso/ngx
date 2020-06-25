import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthSignedIn, authActions } from '../state';

@Injectable()
export class AuthGuardService implements CanActivate {

    /**
     * Ctor
     * @param store Store
     */
    constructor(private store: Store) {
        this.store.dispatch(authActions.signIn())
    }

    /**
     * Can activate function which check the auth guard
     */
    canActivate(): Observable<boolean> {
        return this.store.select(selectAuthSignedIn)
    }
}
