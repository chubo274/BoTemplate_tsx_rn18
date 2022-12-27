import { IAction } from 'app/models/common'
import { UserModel } from 'app/models/user/UserModel'
import { loginEmailTypes } from 'app/redux/actions/user'
import BaseReducer from '../common/baseReducer'

const reducerHandler = new BaseReducer<UserModel, IAction<any>>(loginEmailTypes)

export default reducerHandler
