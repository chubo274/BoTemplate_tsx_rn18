import { IAction, ResponseModel } from "app/models/common";
import { IPostLoginRequest } from "app/models/user/IPostLoginRequest";
import { UserModel } from "app/models/user/UserModel";
import { loginEmailActionTypes, logOutActionTypes, logoutUserFailed, logoutUserSuccess, postLoginFailed, postLoginSuccess } from "app/redux/actions/user";
import { all, put, takeLatest } from "redux-saga/effects";

function* postLoginEmail(action: IAction<IPostLoginRequest>) {
    const { payload, callBacks } = action;
    try {
        // const response: ResponseModel<UserModel> = yield UserRepository.login(payload!);
        const response: ResponseModel<UserModel> = new ResponseModel('200', 200, false, '', new UserModel('token'));

        if (response.data && !response.isError) {
            yield put(postLoginSuccess(response.data, { request: payload }));
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
        } else {
            yield put(postLoginFailed(response.message));
            callBacks && callBacks?.onFailed && callBacks?.onFailed();
        }
    } catch (error) {
        yield put(postLoginFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

function* logOut(action: IAction<any>) {
    const { payload, callBacks } = action;
    try {
        // const response: ResponseModel<UserModel> = yield UserRepository.logout();
        const response: ResponseModel<boolean> = new ResponseModel('200', 200, false, '', true);
        if (!response.isError) {
            yield put(logoutUserSuccess());
            callBacks && callBacks?.onSuccess && callBacks?.onSuccess();
        }
    } catch (error) {
        yield put(logoutUserFailed(error));
        callBacks && callBacks?.onFailed && callBacks?.onFailed();
    }
}

export const userSaga = function* () {
    yield all([
        takeLatest(loginEmailActionTypes.start, postLoginEmail),
        takeLatest(logOutActionTypes.start, logOut),
    ]);
}