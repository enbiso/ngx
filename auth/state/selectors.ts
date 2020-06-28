import { AuthState } from '.'
import { createSelector, createFeatureSelector } from '@ngrx/store'

export const selectFeatureAuth = createFeatureSelector<AuthState>("auth")

export const selectAuthError = createSelector(
    selectFeatureAuth,
    app => app.error
)

export const selectAuthProgress = createSelector(
    selectFeatureAuth,
    app => app.progress
)

export const selectAuthUser = createSelector(
    selectFeatureAuth,
    app => app.user
)

export const selectAuthSignedIn = createSelector(
    selectAuthUser,
    user => user && !user.expired
)

export const selectAuthProfile = createSelector(
    selectAuthUser,
    user => user && user.profile
)

export const selectAuthUserId = createSelector(
    selectAuthProfile,
    profile => profile && profile.sub
)

export const selectAuthHeader = createSelector(
    selectAuthUser,
    user => user && `${user.token_type} ${user.access_token}`
)