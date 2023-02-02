import { ISessionStorage, localStoreTokenRepo } from 'app/data/repositories/user/localStoreTokenRepo';
import { userDataRepo } from 'app/data/repositories/user/userDataRepo';
import { backToTopAppStack, backToTopAuthStack } from 'app/modules/navigation';
import { useEffect , useCallback , useState } from 'react';

export const useInitApp = () => {
    const { getToken } = localStoreTokenRepo()

    const setTokenSession = useCallback(async () => {
        await getToken().then((value: ISessionStorage) => {
            userDataRepo().setTokenUser(value);
            if (value.token) {
                backToTopAppStack()
            } else {
                backToTopAuthStack()
            }
        })
    }, [getToken])

    useEffect(() => {
        setTokenSession()
    }, [setTokenSession])

    return { }
}
