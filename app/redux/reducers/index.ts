import { combineReducers } from 'redux'
import { logOutActionTypes } from '../actions/user'
import userReducer from './user'
import languageReducer from './language'

const appReducer = combineReducers({
    userReducer,
    languageReducer,
})

const rootReducer = (state: any, action: any) => {
    if (action.type === logOutActionTypes.success) {
        delete state.userReducer;
        delete state.languageReducer;
    }
    return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
