import { UserRepository } from 'app/data/repositories/user'
import { IAction, ResponseModel } from 'app/models/common'
import { IPostLoginRequest } from 'app/models/user/IPostLoginRequest'
import { UserModel } from 'app/models/user/UserModel'
import { loginEmailActionTypes, logOutActionTypes, logoutUserFailed, logoutUserSuccess, postLoginFailed, postLoginSuccess } from 'app/redux/actions/user'
import { all, put, takeLatest } from 'redux-saga/effects'

function* postLoginEmail(action: IAction<IPostLoginRequest>) {
    const { payload, callBacks } = action
    try {
        const response: ResponseModel<UserModel> = yield UserRepository.login(payload!)
        yield put(postLoginSuccess(response.data, { request: payload }))
        callBacks && ((callBacks?.onSuccess) != null) && callBacks?.onSuccess()
    } catch (error) {
        yield put(postLoginFailed(error))
        callBacks && ((callBacks?.onFailed) != null) && callBacks?.onFailed()
    }
}

function* logOut(action: IAction<any>) {
    const { callBacks } = action
    try {
        yield UserRepository.logout()
        yield put(logoutUserSuccess())
        callBacks && ((callBacks?.onSuccess) != null) && callBacks?.onSuccess()
    } catch (error) {
        yield put(logoutUserFailed(error))
        callBacks && ((callBacks?.onFailed) != null) && callBacks?.onFailed()
    }
}

export const userSaga = function* () {
    yield all([
        takeLatest(loginEmailActionTypes.start, postLoginEmail),
        takeLatest(logOutActionTypes.start, logOut)
    ])
}
