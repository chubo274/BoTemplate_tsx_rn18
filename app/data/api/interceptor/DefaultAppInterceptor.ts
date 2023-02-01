import { ResponseModel } from 'app/models/common'
import Interceptor, { ResourceType } from './Interceptor'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export default class DefaultInterceptor extends Interceptor {
    constructor(resource: string, resourceType: ResourceType) {
        super(resource, resourceType)
    }

    /**
     * @param {AxiosRequestConfig} config
     * @param {IResource} resourceType
     * @return {AxiosRequestConfig}
     */
    requestFulfilled = (config: AxiosRequestConfig) => {
        return config
    };

    requestReject = async (error: any) => {
        return await Promise.reject(error)
    };

    responseFulfilled = (response: AxiosResponse) => {
        return ResponseModel.createSuccess(response)
    };

    responseReject = async (error: AxiosError<any, any>) => {
        let status = 0
        let statusText = ''
        let message = ''
        let rawError
        try {
            if (error.response != null) {
                status = error.response.status
                console.info('DefaultInterceptorReject', error.response.status)
                console.info('DefaultInterceptorReject', error.response.data)
                console.info('DefaultInterceptorReject', error.response.config)

                const data = error.response.data?.error
                const errors: any[] | undefined = error.response.data?.errors
                if ((errors != null) && errors.length > 0) {
                    message = errors[0].message
                    rawError = errors[0]
                } else {
                    const { statusCode, message: _message, code: _code } = data || {}
                    // server was received message, but response smt
                    status = !(status >= 200 && status < 300) ? status : statusCode
                    statusText = _code
                    message = _message || error?.response?.data?.errorMessage
                    rawError = data
                }
            } else {
                console.warn('smt went wrong: ', error)
                // smt went wrong
                status = 500
                message = error.message
            }
        } catch (_error) {
            console.warn('smt went wrong: ', error)
            // smt went wrong
            status = 500
            message = 'Something went wrong'
        }

        return await Promise.reject(ResponseModel.createError(status, statusText, message, rawError))
    };
}
