import { createAction, props } from '@ngrx/store';
import { User } from 'oidc-client';

export const authActions = {
    signIn: createAction("[EBS Auth] signIn"),
    signInComplete: createAction("[EBS Auth] signInComplete"),
    signInSuccess: createAction("[EBS Auth] signInSuccess", props<{ user: User }>()),
    signInFail: createAction("[EBS Auth] signInFail", props<{ error: string }>()),

    signOut: createAction("[EBS Auth] signOut"),
    signOutComplete: createAction("[EBS Auth] signOutComplete"),
    signOutSuccess: createAction("[EBS Auth] signOutSuccess"),
    signOutFail: createAction("[EBS Auth] signOutFail", props<{ error: string }>()),

    refreshComplete: createAction("[EBS Auth] refeshComplete"),
    refreshSuccess: createAction("[EBS Auth] refreshSuccess", props<{ user: User }>()),
    refreshFail: createAction("[EBS Auth] refreshFail", props<{ error: string }>()),
}