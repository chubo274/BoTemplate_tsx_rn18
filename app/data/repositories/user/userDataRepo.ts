import ApiGateway from 'app/data/api'
import { baseUrl, urls } from 'app/data/api/resource'
import { ResponseModel } from 'app/models/common'
import { IPostLoginRequest } from 'app/models/user/IPostLoginRequest'
import { UserModel } from 'app/models/user/UserModel'
import { ISessionStorage, localStoreTokenRepo } from './localStoreTokenRepo'

/**
 * Always store token in session storage for faster retrieve
 * @type {{token: string}}
 */

const SessionStorage: ISessionStorage = {
    token: ''
}

export const userDataRepo = () => {
    const { setToken, removeToken } = localStoreTokenRepo()

    const login = async (body: IPostLoginRequest): Promise<ResponseModel<UserModel>> => {
        const resource = `${baseUrl}${urls.loginEmail}`
        const apiGateway = new ApiGateway({
            method: 'POST',
            resource,
            body
        })

        return await apiGateway.execute().then(async response => {
            if (response.data) {
                response.data = UserModel.parseFromJson(response.data)
            }
            // that trust example
            const token: ISessionStorage = { token: response?.data?.token, refreshToken: response?.data?.refreshToken }
            return await setTokenUser(token).then((res) => {
                return response
            })
        })
    }

    const setTokenUser = async (responseParsed: ISessionStorage): Promise<boolean> => {
        SessionStorage.token = responseParsed?.token ?? ''
        SessionStorage.refreshToken = responseParsed?.refreshToken ?? ''
        return await setToken(responseParsed)
    }

    const getTokenUser = (): ISessionStorage => {
        return SessionStorage
    }

    const logout = async (): Promise<ResponseModel<boolean>> => {
        SessionStorage.token = '',
        SessionStorage.refreshToken = '',
        await removeToken()
        return ResponseModel.createSuccess(true)
    }

    return {
        login,
        logout,
        getTokenUser,
        setTokenUser,
    }
}
