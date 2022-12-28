import i18n from 'i18next';
import { getI18n, initReactI18next } from 'react-i18next';
import { iLocalization } from './iLocalization';
import en from './resources/en';
import vn from './resources/vn';

export enum LANGUAGES {
    ENGLISH = 'en',
    VIETNAM = 'vn',
}

export const configureLocalization = (language: LANGUAGES, fallback = 'vn') => {
    return i18n
        .use(initReactI18next)
        .init({
            compatibilityJSON: 'v3',
            lng: language,
            fallbackLng: fallback,

            resources: {
                en: {
                    translation: en
                },
                vn: {
                    translation: vn
                },
            },

            debug: false,

            cache: {
                enabled: true
            },

            interpolation: {
                escapeValue: false // not needed for react as it does escape per default to prevent xss!
            }
        });
};

export const getString = (key: keyof iLocalization, params?: any) => {
    if (getI18n()) {
        return getI18n().t(key, params);
    }
    return '';
};

export const changeLanguage = (language: LANGUAGES): Promise<string> => {
    return new Promise((resolve, reject) => {
        i18n.changeLanguage(language).then((success) => {
            resolve('Change language success');
        }).catch((error) => {
            reject(error.toString());
        });
    });

};
