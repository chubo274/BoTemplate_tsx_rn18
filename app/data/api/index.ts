import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import qs from 'qs'
import Interceptor from './interceptor/Interceptor'
import AuthenticationInterceptor from './interceptor/AuthenticationInterceptor'
import { RetryInterceptor } from './interceptor/RetryInterceptor'
import Config from 'app/configs/config'
import { parseFormData } from 'shared/helpers/function'
import DefaultInterceptor from './interceptor/DefaultAppInterceptor'

export type HTTPMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

interface IConstructor {
  resource: string
  method: HTTPMethod
  isFormDataType?: boolean
  configs?: Config
  resourceType?: any
  axiosInstance?: AxiosInstance
  interceptorsCustom?: Interceptor[]
  headers?: Record<string, any>
  timeout?: number
  body?: any
  params?: any
  onSendProgress?: (progress: number, total: number) => void
  onReceivedProgress?: (progress: number, total: number) => void
}
class ApiGateway {
    resource: string
    method: HTTPMethod
    isFormDataType?: boolean
    configs?: Config
    resourceType?: any
    _instanceAxios: AxiosInstance
    interceptorsCustom?: Interceptor[]
    headers?: Record<string, any>
    body?: any
    params?: any
    configTimeout = 30000
    requestConfig!: AxiosRequestConfig
    endpoint?: string

    onSendProgress?: (progress: number, total: number) => void
    onReceivedProgress?: (progress: number, total: number) => void

    constructor (data: IConstructor) {
        const { configs, isFormDataType, resource, resourceType, headers, interceptorsCustom, timeout = 30 * 1000, method, body, params, onReceivedProgress, onSendProgress, axiosInstance } = data
        this.configs = configs
        this.resourceType = resourceType
        this.resource = resource
        this.headers = headers
        this.interceptorsCustom = interceptorsCustom
        this.configTimeout = timeout
        this.method = method
        this.body = body
        this.params = params
        this._instanceAxios = axiosInstance ?? axios.create()
        this.onSendProgress = onSendProgress
        this.onReceivedProgress = onReceivedProgress
        this.isFormDataType = isFormDataType
        // this._errorLogInterceptor = new ErrorLogInterceptor();

        // this.endpoint = this.getEndpoint(resourceType);

        this._config()
    }

    private readonly _config = () => {
        this.requestConfig = {
            baseURL: this.endpoint,
            timeout: this.configTimeout,
            headers: (this.headers != null)
                ? this.headers
                : {
                    'Content-Type': this.isFormDataType ? 'multipart/form-data' : 'application/json'
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
        const authenticationInterceptor = new AuthenticationInterceptor(this.resource, this.configs)
        this._instanceAxios.interceptors.request.use(authenticationInterceptor.requestFulfilled)

        const retryInterceptor = new RetryInterceptor(this._instanceAxios, this.resource, this.resourceType, this.configs)
        this._instanceAxios.interceptors.response.use(
            retryInterceptor.responseFulfilled,
            retryInterceptor.responseReject
        );
    }

    private readonly _addInterceptors = () => {
        if (this.interceptorsCustom != null) {
            this.interceptorsCustom.forEach((interceptor: Interceptor) => {
                this._instanceAxios.interceptors.request.use(
                    interceptor.requestFulfilled,
                    interceptor.requestReject
                );
                this._instanceAxios.interceptors.response.use(
                    interceptor.responseFulfilled,
                    interceptor.responseReject
                );
            })
        } else { // some expand interceptors default can be add here!
            const defaultInterceptor = new DefaultInterceptor(this.resource)
            this._instanceAxios.interceptors.request.use(
                defaultInterceptor.requestFulfilled,
                defaultInterceptor.requestReject
            );
            this._instanceAxios.interceptors.response.use(
                defaultInterceptor.responseFulfilled,
                defaultInterceptor.responseReject
            );
        }
    }

    execute = async (): Promise<any> => await this._instanceAxios.request(this.requestConfig)
}

export default ApiGateway
