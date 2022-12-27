import { StoreKey } from 'shared/helpers/constant'
import { getLocal, IValueUpdate, removeLocal, setLocal, updateLocal } from 'shared/helpers/function'

export interface ISessionStorage {
  token?: string
  refreshToken?: string
}

export const localStoreTokenRepo = () => {
    const getToken = async (): Promise<ISessionStorage> => await getLocal(StoreKey.Token)

    const setToken = async (data: ISessionStorage): Promise<boolean> => await setLocal(StoreKey.Token, data)

    const updateToken = async (data: Array<IValueUpdate<ISessionStorage>>): Promise<boolean> => await updateLocal(StoreKey.Token, data)

    const removeToken = async (): Promise<boolean> => await removeLocal(StoreKey.Token)

    return {
        getToken,
        setToken,
        updateToken,
        removeToken,
    }
}
