import { IAction } from 'app/models/common';
import { changeLanguageTypes } from 'app/redux/actions/language';
import { LANGUAGES } from 'shared/localization';
import BaseReducer from '../common/baseReducer';

const reducerHandler = new BaseReducer<LANGUAGES, IAction<any>>(changeLanguageTypes);

export default reducerHandler.reducer;