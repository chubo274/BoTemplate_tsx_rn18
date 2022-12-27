import { createSelector } from 'reselect'

export const selectUserReducer = createSelector(
    (state: any) => state.userReducer,
    userReducer => userReducer
)

export const selectUserToken = createSelector(
    (state: any) => selectUserReducer(state),
    userReducer => userReducer.token
)
