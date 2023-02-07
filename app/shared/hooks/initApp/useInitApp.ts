import { ISessionStorage, localStoreTokenRepo } from 'app/data/repositories/user/localStoreTokenRepo';
import { userDataRepo } from 'app/data/repositories/user/userDataRepo';
import { backToTopAppStack, backToTopAuthStack } from 'app/modules/navigation';
import { useCallback, useEffect } from 'react';

export const useInitApp = () => {
    const { getToken } = localStoreTokenRepo()
    const setTokenSession = useCallback(async () => {
        return getToken().then((value: ISessionStorage) => {
            userDataRepo().setTokenUser(value);
            return value.token;
        })
    }, [getToken]);

    const initStateApp = useCallback(async () => {
        const token = await setTokenSession();
        // const listApiInit = await Promise.all([getStudentOfParent(), getCommonApplicaton(), getNationalities()]);
        // if (listApiInit.find((el: boolean) => el === false)) {
        //     console.error('listApiInit got error');
        // } else {
        //     if (token) {
        //         backToTopAppStack()
        //     } else {
        //         backToTopAuthStack()
        //     }
        if (token) {
            backToTopAppStack()
        } else {
            backToTopAuthStack()
        }
    }, [setTokenSession])

    useEffect(() => {
        initStateApp()
    }, [initStateApp])

    return {}
}
