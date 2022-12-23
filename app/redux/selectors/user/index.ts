import {createSelector} from 'reselect';

export const selectUserReducer = createSelector(
    (state: any) => state.userReducer,
    userReducer => userReducer
);