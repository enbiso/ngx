import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthSignedIn, authActions, selectAuthProgress } from '../state';
import { filter, mergeMap } from 'rxjs/operators';

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
        return this.store.select(selectAuthProgress).pipe(
            filter(progress => !progress),
            mergeMap(_ => this.store.select(selectAuthSignedIn))
        )
    }
}
