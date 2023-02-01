import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { parseFormData } from 'shared/helpers/function'
import AuthenticationInterceptor from './interceptor/AuthenticationInterceptor'
import DefaultInterceptor from './interceptor/DefaultAppInterceptor'
import { ResourceType } from './interceptor/Interceptor'
import { baseUrl } from './resource'

export type HTTPMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'POSTFORM'

interface IConstructor {
    method: HTTPMethod
    resource: string
    resourceType: ResourceType
    isFormDataType?: boolean
    body?: any
    params?: any
    onSendProgress?: (progress: number, total: number) => void
    onReceivedProgress?: (progress: number, total: number) => void
}
class ApiGateway {
    resource: string
    method: HTTPMethod
    isFormDataType?: boolean
    resourceType: ResourceType
    body?: any
    params?: any
    _instanceAxios = axios.create()
    configTimeout = 30 * 1000
    requestConfig!: AxiosRequestConfig

    onSendProgress?: (progress: number, total: number) => void
    onReceivedProgress?: (progress: number, total: number) => void

    constructor(data: IConstructor) {
        const { resource, resourceType, method, body, params,
            onReceivedProgress, onSendProgress, isFormDataType } = data
        this.resourceType = resourceType
        this.resource = resource
        this.method = method
        this.body = body
        this.params = params
        this.onSendProgress = onSendProgress
        this.onReceivedProgress = onReceivedProgress
        this.isFormDataType = isFormDataType

        this._config()
    }

    private readonly _config = () => {
        this.requestConfig = {
            baseURL: baseUrl,
            timeout: this.configTimeout,
            headers: {
                'Accept': 'application/json',
                'Content-Type': this.isFormDataType ? 'application/x-www-form-urlencoded' : 'application/json', // Content-Type = 'application/json' == null
            },
            url: this.resource,
            method: this.method,
            params: this.params,
            paramsSerializer: {
                encode: (params: any) => qs.stringify(params, {
                    skipNulls: true,
                    arrayFormat: 'brackets'
                })
            },
            data: this.isFormDataType ? parseFormData(this.body) : this.body
        };
        if (this.onSendProgress != null) {
            this.requestConfig.onUploadProgress = ({ loaded, total }) => this.onSendProgress!(loaded, total ?? 0)
        }
        if (this.onReceivedProgress != null) {
            this.requestConfig.onDownloadProgress = ({ loaded, total }) => this.onReceivedProgress!(loaded, total ?? 0)
        }
        this._addDefaultInterceptors()
        this._addInterceptors()
    };

    private readonly _addDefaultInterceptors = () => {
        const authenticationInterceptor = new AuthenticationInterceptor(this.resource, this.resourceType)
        this._instanceAxios.interceptors.request.use(authenticationInterceptor.requestFulfilled)

        // const retryInterceptor = new RetryInterceptor(this._instanceAxios, this.resource, this.resourceType)
        // this._instanceAxios.interceptors.response.use(
        //     retryInterceptor.responseFulfilled,
        //     retryInterceptor.responseReject
        // );
    }

    private readonly _addInterceptors = () => {
        // some expand interceptors default can be add here!
        const defaultInterceptor = new DefaultInterceptor(this.resource, this.resourceType)
        this._instanceAxios.interceptors.request.use(
            defaultInterceptor.requestFulfilled,
            defaultInterceptor.requestReject
        );
        this._instanceAxios.interceptors.response.use(
            defaultInterceptor.responseFulfilled,
            defaultInterceptor.responseReject
        );
    }

    execute = async (): Promise<any> => await this._instanceAxios.request(this.requestConfig)
}

export default ApiGateway
