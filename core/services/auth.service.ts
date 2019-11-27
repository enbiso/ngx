import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { environment } from 'environments/environment';
import { AbsoluteUri, BaseUri } from '../utils';
import { UserProfile, AuthChangeEvent } from '../models';
import { Subject } from 'rxjs';

/**
 * Auth service
 */
@Injectable()
export class AuthService {

    private settings: UserManagerSettings = Object.assign(environment.oidc, {
        redirect_uri: AbsoluteUri('auth-callback'),
        post_logout_redirect_uri: BaseUri(),
        response_type: 'id_token token',
        filterProtocolClaims: true,
        loadUserInfo: true
    });

    public onAuthChange = new Subject<AuthChangeEvent>();

    private manager = new UserManager(this.settings);

    /**
     * Gets the current user profile
     */
    profile(): Promise<UserProfile> {
        return this.manager.getUser().then(user => user && user.profile || null);
    }

    /**
     * Check if the user is logged in
     */
    loggedIn(): Promise<boolean> {
        return this.manager.getUser().then(user => user != null && !user.expired);
    }

    /**
     * Gets authorization header
     */
    authHeader(): Promise<string> {
        return this.manager.getUser().then(user =>
            `${user && user.token_type} ${user && user.access_token}`);
    }

    /**
     * Start authentication
     */
    startSignIn(): Promise<void> {
        return this.manager.signinRedirect();
    }

    /**
     * Complete authentication
     */
    completeSignIn(): Promise<User> {
        return this.manager.signinRedirectCallback().then(_ => {
            this.onAuthChange.next(AuthChangeEvent.afterSignIn)
            return _;
        });
    }

    /**
     * Start logout
     */
    startSignOut(): Promise<void> {
        return this.manager.signoutRedirect();
    }

    /**
     * Complete logout
     */
    completeSignOut(): Promise<void> {
        return this.manager.signoutRedirectCallback().then(() => {
            this.onAuthChange.next(AuthChangeEvent.afterSignOut)
        });
    }
}