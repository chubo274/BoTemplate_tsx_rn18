import { ActionStatus } from "shared/helpers/constant";

// model & interface for redux

export interface IDictionary<T> {
    [key: string]: T;
}

export interface IActionCallBacks {
    onSuccess?: (data?: any) => void;
    onFailed?: (error?: string) => void;

    [key: string]: any;
}

export interface IActionParams<T> {
    request?: T;
    sectionId?: string;
    isAppend?: boolean;
    canLoadMore?: boolean | IDictionary<boolean>;

    [key: string]: any;
}

export interface IAction<T> {
    type: string;
    payload?: T;
    params?: IActionParams<any>;
    error?: any;
    callBacks?: IActionCallBacks;

    [key: string]: any;
}

export interface IReducer<T> {
    isFetching: boolean;
    status: ActionStatus;
    data?: T;
    canLoadMore?: boolean | IDictionary<boolean>;
    params?: IActionParams<any>;
    errorMessage?: string;
    error?: any;
    actionType: string;
    success: boolean;
}

export class ResponseModel<T> {
    code: string;
    statusCode: number;
    isError: boolean;
    message?: string;
    rawError?: any;
    data?: T;

    constructor(
        code = "",
        statusCode = 0,
        isError = false,
        message?: string,
        data?: T,
    ) {
        this.code = code;
        this.isError = isError;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    static createSuccess(data: any): ResponseModel<any> {
        const response = new ResponseModel();
        response.data = data;
        response.isError = false;
        response.statusCode = 200;
        return response;
    }

    static createError(
        statusCode: number,
        code = "",
        message?: string,
        rawError?: any
    ): ResponseModel<any> {
        const response = new ResponseModel();
        response.isError = true;
        response.code = code;
        response.message = message;
        response.rawError = rawError;
        response.statusCode = statusCode;
        return response;
    }

    toString = () => {
        return this.message;
    };
}

// model & interface for 