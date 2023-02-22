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
        yield put(postLoginSuccess(response?.data, { request: payload }))
        callBacks?.onSuccess?.(response?.data)
    } catch (error: any) {
        yield put(postLoginFailed(error))
        callBacks?.onFailed?.(error?.message)
    }
}

function* logOut(action: IAction<any>) {
    const { callBacks } = action
    try {
        yield UserRepository.logout()
        yield put(logoutUserSuccess())
        callBacks?.onSuccess?.()
    } catch (error: any) {
        yield put(logoutUserFailed(error))
        callBacks?.onFailed?.(error?.message)
    }
}

export const userSaga = function* () {
    yield all([
        takeLatest(loginEmailActionTypes.start, postLoginEmail),
        takeLatest(logOutActionTypes.start, logOut)
    ])
}
