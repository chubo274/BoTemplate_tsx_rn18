import Config from 'app/configs/config'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export default abstract class Interceptor {
    resource: string
    setting?: Config
    resourceType?: any

    protected constructor(resource: string, resourceType?: any, setting?: Config) {
        this.setting = setting
        this.resource = resource
        this.resourceType = resourceType
    }

    abstract requestFulfilled(config: AxiosRequestConfig): AxiosRequestConfig

    abstract requestReject(error: any): any

    abstract responseFulfilled(response: AxiosResponse): any

    abstract responseReject(error: any): Promise<any>
}
