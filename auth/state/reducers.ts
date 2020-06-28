import { on, createReducer } from "@ngrx/store"
import { authActions } from './actions'
import { User } from 'oidc-client'

export interface AuthState {
    progress: boolean
    user: User,
    error: string
}

export const initialAuthState: AuthState = {
    progress: false,
    user: null,
    error: null
}

const _authReducer = createReducer(initialAuthState,
    on(authActions.signIn, (state) => {
        return ({
            ...state,
            progress: true
        })
    }),
    on(authActions.signInComplete, (state) => {
        return ({
            ...state,
            progress: true
        })
    }),
    on(authActions.signInSuccess, (state, action) => {
        return ({
            ...state,
            progress: false,
            user: action.user,
            error: null
        })
    }),
    on(authActions.signInFail, (state, action) => {
        return ({
            ...state,
            progress: false,
            user: null,
            error: action.error
        })
    }),
    on(authActions.signOut, (state) => {
        return ({
            ...state,
            progress: true,
        })
    }),
    on(authActions.signOutComplete, (state) => {
        return ({
            ...state,
            progress: true,
        })
    }),
    on(authActions.signOutSuccess, (state) => {
        return ({
            ...state,
            progress: false,
            user: null,
            error: null
        })
    }),
    on(authActions.signOutFail, (state, action) => {
        return ({
            ...state,
            progress: false,
            error: action.error
        })
    }),
    on(authActions.refreshComplete, (state) => {
        return ({
            ...state,
            progress: true,
        })
    }),
    on(authActions.refreshSuccess, (state, action) => {
        return ({
            ...state,
            progress: false,
            user: action.user,
            error: null
        })
    }),
    on(authActions.refreshFail, (state, action) => {
        return ({
            ...state,
            progress: false,
            error: action.error
        })
    }),
)

export const authReducer = function (state, action) {
    return _authReducer(state, action)
}