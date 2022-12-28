import { IReducer } from 'app/models/common'
import { createSelector } from 'reselect'
import { LANGUAGES } from 'shared/localization'

export const selectLanguageReducer = createSelector(
    (state: any) => state.languageReducer,
    (languageReducer: IReducer<LANGUAGES>) => languageReducer
)
