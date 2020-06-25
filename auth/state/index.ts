import { User } from 'oidc-client';

export * from './actions'
export * from './reducers'
export * from './selectors'

export interface AuthState {
    progress: boolean
    user: User,
    error: string
}

export interface AppState {
    auth: AuthState
}

