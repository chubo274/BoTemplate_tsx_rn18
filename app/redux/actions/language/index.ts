import { IAction } from 'app/models/common';
import { changeLanguage, LANGUAGES } from 'shared/localization';
import { CHANGE_LANGUAGE } from '../common/actionTypes';
import { createActionNormalTypes } from '../common/helper';

export const changeLanguageTypes = CHANGE_LANGUAGE;
export const changeLanguageActionTypes = createActionNormalTypes(changeLanguageTypes);

export const changeAppLanguage = (payload: LANGUAGES): IAction<LANGUAGES> => {
    changeLanguage(payload);
    return {
        type: changeLanguageActionTypes.success,
        payload
    }
};