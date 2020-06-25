import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { authActions } from './actions';
import { tap, mergeMap, map, catchError, filter } from 'rxjs/operators';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    signIn$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signIn),
        mergeMap(() => this.authService.getUser()),
        tap(user => {
            if (!user || user.expired)
                return this.authService.startSignIn()
        }),
        filter(user => user && !user.expired),
        map(user => authActions.signInSuccess({ user: user }))
    ))

    signOut$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signOut),
        tap(_ => this.authService.startSignOut())
    ))

    signInComplete$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signInComplete),
        mergeMap(() => this.authService.completeSignIn()),
        map(user => authActions.signInSuccess({ user: user })),
        catchError((err) => of(authActions.signInFail({ error: err.message })))
    ))

    signOutComplete$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signOutComplete),
        mergeMap(() => this.authService.completeSignOut()),
        map(() => authActions.signOutSuccess()),
        catchError((err) => of(authActions.signOutFail({ error: err.message })))
    ))

    signInSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.signInSuccess),
        tap(() => this.router.navigateByUrl("/"))
    ), { dispatch: false })

    constructor(
        private router: Router,
        private authService: AuthService,
        private actions$: Actions
    ) { }
}