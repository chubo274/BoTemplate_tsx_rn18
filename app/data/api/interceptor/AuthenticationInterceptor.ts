import { UserRepository } from 'app/data/repositories/user'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import Interceptor, { ResourceType } from './Interceptor'

export default class AuthenticationInterceptor extends Interceptor {
    _userRepository: typeof UserRepository

    constructor(resource: string, resourceType: ResourceType) {
        super(resource, resourceType)

        this._userRepository = UserRepository
    }

    getTokenFromType = (type: ResourceType): string => {
        const userData = this._userRepository.getTokenUser()
        switch (type) {
            case ResourceType.Auth:
                return userData?.token ?? ''
            case ResourceType.Public:
            default:
                return ''
        }
    };

    /**
     * @param {AxiosRequestConfig} config
     * @param {IResource} resourceType
     * @return {AxiosRequestConfig}
     */
    requestFulfilled = (config: AxiosRequestConfig) => {
        const token = this.getTokenFromType(this.resourceType)

        if (config.headers == null) {
            config.headers = {}
        }

        const contentType = config.headers['Content-Type']
        if (contentType === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data)
        }

        if (!!token) {
            config.headers.Authorization = token
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
