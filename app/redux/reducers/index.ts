import { combineReducers } from 'redux'
import { logOutActionTypes } from '../actions/user'
import userReducer from './user'

const appReducer = combineReducers({
    userReducer,
})

const rootReducer = (state: any, action: any) => {
    if (action.type === logOutActionTypes.success) {
        delete state.userReducer
    }
    return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
