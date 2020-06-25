import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthError, authActions, selectAuthProgress } from '@enbiso/auth/state';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'ebs-core-auth-callback',
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
    error$: Observable<string>
    tokenTime$: Observable<number>
    progress$: Observable<boolean>
    nowTime: number

    constructor(
        private store: Store) {
        this.progress$ = store.select(selectAuthProgress)
        this.error$ = store.select(selectAuthError)
        this.tokenTime$ = this.error$.pipe(
            map(error => {
                if (!error) return null
                if (error.startsWith("iat is in the future:") || error.startsWith("exp is in the past:"))
                    return parseInt(error.split(":")[1]) * 1000
                else
                    return null
            }),
        )
    }

    ngOnInit() {
        this.nowTime = Date.now()
        this.store.dispatch(authActions.signInComplete())
    }
}