import AsyncStorage from '@react-native-async-storage/async-storage'
import { StoreKey } from './constant'

export interface IValueUpdate<T> {
  key: keyof T
  value: any
}
/// AsyncStorage function
export const getLocal = async (key: StoreKey): Promise<any> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : undefined
    } catch (e) {
        console.info('localStoreRepo getUser Error', e)
        return undefined
    }
}

export const setLocal = async (key: StoreKey, data: any): Promise<boolean> => {
    try {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem(key, jsonValue)
        return true
    } catch (e) {
        console.info('localStoreRepo setUser Error', e)
        return false
    }
}

export const updateLocal = async (key: StoreKey, data: Array<IValueUpdate<any>>): Promise<boolean> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        const objValue = jsonValue != null ? JSON.parse(jsonValue) : undefined
        if (jsonValue) {
            data.map((el: IValueUpdate<any>) => {
                objValue[el.key] = el.value
            })
            const jsonValue = JSON.stringify(objValue)
            await AsyncStorage.setItem(key, jsonValue)
            return true
        }
        return false
    } catch (e) {
        console.info('localStoreRepo updateUser Error', e)
        return false
    }
}

export const removeLocal = async (key: StoreKey): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem(key)
        return true
    } catch (e) {
        console.info('localStoreRepo removeUser Error', e)
        return false
    }
}

/// parse formData for body api
export const parseFormData = (data: any): FormData => {
    const bodyFormData = new FormData()
    Object.keys(data).forEach((key: string) => {
        bodyFormData.append(key, data[key])
    })
    return bodyFormData
}

// check can load more for action load more by template
export const processCanLoadMore = (currentData?: any[], pageSize?: number) => {
    if ((pageSize || 0) > 0 && (currentData?.length ?? 0) === (pageSize ?? 0)) {
        return true
    }
    return false
}
