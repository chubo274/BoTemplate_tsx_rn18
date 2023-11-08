import { Platform } from 'react-native';
import ReactNativeBlobUtil, { FetchBlobResponse, ReactNativeBlobUtilConfig, StatefulPromise } from 'react-native-blob-util';

class DownloadHandler {
    task: StatefulPromise<FetchBlobResponse> | null
    constructor() {
        this.task = null;
    }

    downloadFile(url: string, configfb?: ReactNativeBlobUtilConfig) {
        const fileName = url.split('/').pop()
        const { dirs } = ReactNativeBlobUtil?.fs;
        const path = Platform.OS == 'ios' ? `${dirs?.DocumentDir}/${fileName}` : `${dirs?.DownloadDir}/${fileName}`

        const configfbDefault: ReactNativeBlobUtilConfig = {
            fileCache: true,
            // addAndroidDownloads: {
            //     useDownloadManager: true,
            //     notification: true,
            //     mediaScannable: true,
            //     title: fileName,
            // },
            path,   // ios && camera roll need path. If dont have res.data just only file template can not use
        }
        
        this.task = ReactNativeBlobUtil.config({ ...configfbDefault, ...configfb }).fetch('GET', `${url}`)
        return this.task;
    }
}

export default DownloadHandler;