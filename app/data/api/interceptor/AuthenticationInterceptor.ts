import Config from 'app/configs/config'
import { UserRepository } from 'app/data/repositories/user'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import Interceptor from './Interceptor'

export default class AuthenticationInterceptor extends Interceptor {
    _userRepository: typeof UserRepository

    constructor (resource: string, resourceType?: any, setting?: Config) {
        super(resource, resourceType, setting)

        this._userRepository = UserRepository
    }

    getTokenFromType = (type?: any): string => {
        const userData = this._userRepository.getTokenUser()
        switch (type) {
            default:
                return userData?.token ?? ''
        }
    };

    /**
     * @param {AxiosRequestConfig} config
     * @param {IResource} resourceType
     * @return {AxiosRequestConfig}
     */
    requestFulfilled = (config: AxiosRequestConfig) => {
        let authHeader
        const token = this.getTokenFromType(this.resourceType)

        if (token) {
            authHeader = `Bearer ${token}`
        }

        if (config.headers == null) {
            config.headers = {}
        }

        const contentType = config.headers['Content-Type']
        if (contentType === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data)
        }

        if (authHeader) {
            config.headers.Authorization = authHeader
        }
        if (this.resourceType) {
            // Add default token of axios for unit test
            // config.headers.Authorization = axios.defaults.headers['Authorization'];
        }
        return config
    };

    requestReject = async (error: any) => {
        return await Promise.reject(error)
    };

    responseFulfilled = (response: AxiosResponse) => response

    responseReject = async (error: AxiosError) => await Promise.reject(error)
}
