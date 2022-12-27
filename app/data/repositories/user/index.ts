import { localStoreTokenRepo } from './localStoreTokenRepo'
import { userDataRepo } from './userDataRepo'

export const UserRepository = {
    ...{
        ...localStoreTokenRepo(),
        ...userDataRepo()
    },
}
