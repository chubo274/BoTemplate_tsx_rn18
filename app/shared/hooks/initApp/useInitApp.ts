import { ISessionStorage, localStoreTokenRepo } from 'app/data/repositories/user/localStoreTokenRepo';
import { userDataRepo } from 'app/data/repositories/user/userDataRepo';
import { backToTopAppStack, backToTopAuthStack } from 'app/modules/navigation';
import { useEffect , useCallback , useState } from 'react';

export const useInitApp = () => {
    const { getToken } = localStoreTokenRepo()

    const [isSettingUp, setIsSettingUp] = useState(false);

    const setTokenSession = useCallback(async () => {
        setIsSettingUp(true)
        await getToken().then((value: ISessionStorage) => {
            userDataRepo().setTokenUser(value);
            setIsSettingUp(false);
            if (value.token) {
                backToTopAppStack()
            } else {
                backToTopAuthStack()
            }
        })
    }, [getToken, setIsSettingUp])

    useEffect(() => {
        setTokenSession()
    }, [setTokenSession])

    return { isSettingUp }
}