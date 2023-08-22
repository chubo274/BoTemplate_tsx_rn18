import { StoreKey } from 'shared/helpers/constant';
import { setLocal } from 'shared/helpers/function';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { KeyZustand } from './keyZustand';
interface IRootState {
    state: { [key in KeyZustand]?: any },
    save: (key: string, value: any) => void,
    get: (key: KeyZustand) => any
}

type UseSave = () => (key: KeyZustand, value: any) => void
type UseGet = (key: KeyZustand) => any

// @ts-ignore
const StoreZustand: UseBoundStore<StoreApi<IRootState>> = create((set) => ({
    state: {},
    save: (key: KeyZustand, value: any) => {
        if (key in StoreKey) {
            setLocal(key, value).then(() => {
                return set((rootState: IRootState) => ({
                    state: {
                        ...rootState.state,
                        [key]: value,
                    },
                }));
            })
        }

        return set((rootState: IRootState) => ({
            state: {
                ...rootState.state,
                [key]: value,
            },
        }));
    },
    get: (key: KeyZustand) => rootState?.state?.[key],
}));

export const useSave: UseSave = () => StoreZustand((rootState) => rootState?.save);
export const useGet: UseGet = (key: KeyZustand) => StoreZustand((rootState) => rootState?.state?.[key]);
export default StoreZustand 