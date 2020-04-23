import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User, Profile } from 'oidc-client';
import { environment } from 'environments/environment';
import { AbsoluteUri, BaseUri } from '../utils';
import { UserProfile } from '../models';
import { Subject, from, Observable, BehaviorSubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

/**
 * Auth service
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

    private settings: UserManagerSettings = Object.assign(environment.oidc, {
        redirect_uri: AbsoluteUri('auth-callback'),
        post_logout_redirect_uri: BaseUri(),
        response_type: 'id_token token',
        filterProtocolClaims: true,
        loadUserInfo: true
    });

    public onSignIn = new Subject<void>()
    public onSignOut = new Subject<void>()

    public profileChange = new BehaviorSubject<Profile | UserProfile>(null)

    private manager = new UserManager(this.settings);

    constructor() {
        from(this.loggedIn())
            .pipe(map(loggedIn => loggedIn ? this.onSignIn.next() : this.onSignOut.next()))
            .subscribe()
        this.onSignIn
            .pipe(mergeMap(() => from(this.manager.getUser())
                .pipe(map(user => user && user.profile || null))
                .pipe(map(profile => this.profileChange.next(profile)))))
            .subscribe()
    }

    /**
     * Check if the user is logged in
     */
    loggedIn(): Observable<boolean> {
        return from(this.manager.getUser())
            .pipe(map(user => user != null && !user.expired))
    }

    /**
     * Check if roll exists
     */
    inRole(role: string): Observable<boolean> {
        return from(this.manager.getUser())
            .pipe(map(user => {
                const roles = user && user.profile && user.profile.role
                return Array.isArray(roles)
                    ? roles.indexOf(role) >= 0
                    : roles == role
            }))
    }

    /**
     * Gets authorization header
     */
    authHeader(): Observable<string> {
        return from(this.manager.getUser())
            .pipe(map(user => `${user && user.token_type} ${user && user.access_token}`))
    }

    /**
     * Start authentication
     */
    startSignIn(): Observable<void> {
        return from(this.manager.signinRedirect())
    }

    /**
     * Complete authentication
     */
    completeSignIn(): Observable<User> {
        return from(this.manager.signinRedirectCallback()).pipe(map(_ => {
            this.onSignIn.next()
            return _;
        }))
    }

    /**
     * Start logout
     */
    startSignOut(): Observable<void> {
        return from(this.manager.signoutRedirect())
    }

    /**
     * Complete logout
     */
    completeSignOut(): Observable<void> {
        return from(this.manager.signoutRedirectCallback().then(() => {
            this.onSignOut.next()
        }))
    }
}