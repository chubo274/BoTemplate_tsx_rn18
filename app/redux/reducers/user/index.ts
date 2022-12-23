import { combineReducers } from "redux";
import loginReducer from './loginReducer';

const userReducer = combineReducers({
    loginReducer: loginReducer.reducer,
});

export default userReducer;