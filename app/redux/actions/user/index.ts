import { IAction, IActionCallBacks, IActionParams } from "app/models/common";
import { IPostLoginRequest } from "app/models/user/IPostLoginRequest";
import { UserModel } from "app/models/user/UserModel";
import { LOGOUT_USER, POST_LOGIN } from "../common/actionTypes";
import { createActionNormalTypes } from "../common/helper";

/// LOGIN
export const loginEmailTypes = POST_LOGIN;
export const loginEmailActionTypes = createActionNormalTypes(loginEmailTypes);

export const postLoginRequest = (
    payload: IPostLoginRequest,
    callBacks?: IActionCallBacks
): IAction<IPostLoginRequest> => ({
    type: loginEmailActionTypes.start,
    payload: payload,
    callBacks,
})

export const postLoginSuccess = (
    payload: UserModel,
    params: IActionParams<IPostLoginRequest>,
    callBacks?: IActionCallBacks
): IAction<UserModel> => ({
    type: loginEmailActionTypes.success,
    payload,
    params,
    callBacks,
})

export const postLoginFailed = (
    payload: any,
    callBacks?: IActionCallBacks
): IAction<any> => ({
    type: loginEmailActionTypes.failed,
    payload,
    callBacks,
})

/// LOGOUT
export const logOutTypes = LOGOUT_USER;
export const logOutActionTypes = createActionNormalTypes(logOutTypes);

export const logoutUser = (): IAction<any> => ({
    type: logOutActionTypes.start
})

export const logoutUserSuccess = (payload?: any): IAction<any> => ({
    type: logOutActionTypes.success,
    payload
})

export const logoutUserFailed = (payload: any): IAction<any> => ({
    type: logOutActionTypes.failed,
    payload
})