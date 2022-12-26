import { StoreKey } from "shared/helpers/constant";
import { getLocal, IValueUpdate, removeLocal, setLocal, updateLocal } from "shared/helpers/function";

export interface ISessionStorage {
    token?: string;
    refreshToken?: string;
}

export const localStoreTokenRepo = () => {
    const getToken = (): Promise<ISessionStorage> => getLocal(StoreKey.Token);

    const setToken = (data: ISessionStorage): Promise<boolean> => setLocal(StoreKey.Token, data);

    const updateToken = (data: IValueUpdate<ISessionStorage>[]): Promise<boolean> => updateLocal(StoreKey.Token, data);

    const removeToken = (): Promise<boolean> => removeLocal(StoreKey.Token);

    return {
        getToken,
        setToken,
        updateToken,
        removeToken,
    }
}