import 'i18next';
import vn from './resources/vn';

declare module 'i18next' {
    // and extend them!
    interface CustomTypeOptions {
        // custom namespace type if you changed it
        defaultNS: 'translation';
        // custom resources type
        resources: {
            translation: typeof vn;
        };
    }
}