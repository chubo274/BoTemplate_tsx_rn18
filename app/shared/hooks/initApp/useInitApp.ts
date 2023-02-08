import { ISessionStorage, localStoreTokenRepo } from 'app/data/repositories/user/localStoreTokenRepo';
import { userDataRepo } from 'app/data/repositories/user/userDataRepo';
import { backToTopAppStack, backToTopAuthStack } from 'app/modules/navigation';
import { useCallback, useRef } from 'react';

export const useInitApp = () => {
    const { getToken } = localStoreTokenRepo();
    const refInitIsDone = useRef<boolean>(false);

    const setTokenUser = useCallback(async () => {
        return getToken().then((value: ISessionStorage) => {
            userDataRepo().setTokenUser(value);
            return value.token;
        })
    }, [getToken]);

    // export to use in other place
    const promiseInitBeforeLogin = useCallback(async () => {
        const listInitApi = await Promise.all([]);
        const indexApiGetError = listInitApi.findIndex((el: boolean) => el === false);

        if (indexApiGetError != -1) {
            console.error('init api got Error Before Login at ', indexApiGetError);
            return false
        }
        return true
    }, [])

    const promiseInitAfterLogin = useCallback(async () => {
        const listInitApi = await Promise.all([]);
        const indexApiGetError = listInitApi.findIndex((el: boolean) => el === false);
        if (indexApiGetError != -1) {
            console.error('init api got Error After Login at ', indexApiGetError);
            return false
        }
        return true
    }, [])

    const initStateApp = useCallback(async () => {
        const before = await promiseInitBeforeLogin();
        if (!before) return;
        const token = await setTokenUser();
        if (!token && !refInitIsDone.current) {
            refInitIsDone.current = true;
            backToTopAuthStack()
            return
        }

        const after = await promiseInitAfterLogin();
        if (!after) return;
        if (token && !refInitIsDone.current) {
            refInitIsDone.current = true;
            backToTopAppStack()
            return
        }
    }, [setTokenUser, promiseInitBeforeLogin, promiseInitAfterLogin])

    return { initStateApp, promiseInitBeforeLogin, promiseInitAfterLogin }
}
