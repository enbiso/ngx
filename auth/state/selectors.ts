import { AppState } from '.'
import { createSelector } from '@ngrx/store'

export const selectFeatureAuth = (state: AppState) => state.auth

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