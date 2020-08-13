import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User, SignoutResponse } from 'oidc-client';
import { environment } from 'environments/environment';
import { from, Observable } from 'rxjs';
import { AbsoluteUri, BaseUri } from '@enbiso/core/utils';

/**
 * Auth service
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

    private settings: UserManagerSettings = Object.assign(environment.oidc, <UserManagerSettings>{
        redirect_uri: AbsoluteUri('auth-callback'),
        post_logout_redirect_uri: BaseUri(),
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        silent_redirect_uri: AbsoluteUri('refresh-callback')
    });

    private manager = new UserManager(this.settings);

    /**
     * Get User
     */
    getUser(): Observable<User> {
        return from(this.manager.getUser())
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
        return from(this.manager.signinRedirectCallback())
    }


    /**
     * Complete Refresh
     */
    completeRefresh(): Observable<User> {
        return from(this.manager.signinSilentCallback())
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
    completeSignOut(): Observable<SignoutResponse> {
        return from(this.manager.signoutRedirectCallback())
    }
}