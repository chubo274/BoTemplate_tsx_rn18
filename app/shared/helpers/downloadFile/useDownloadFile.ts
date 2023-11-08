import { CameraRoll } from '@react-native-camera-roll/camera-roll'; // version has working on 6.0.2
import { useCallback, useRef, useState } from 'react';
import { Platform } from 'react-native';
import ReactNativeBlobUtil, { FetchBlobResponse } from 'react-native-blob-util';  // version has working on 0.19.2
import DownloadHandler from 'shared/helpers/DownloadHandler';
import { filePath, listPathSavetoRoll } from 'shared/helpers/filePath';

export const useDownloading = () => {
    const downloadInstance = useRef(new DownloadHandler());

    const [isDownloading, setDownloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const download = useCallback(async (url: string, dirSave?: 'roll' | 'document') => {
        const fileName = url.split('/').pop()
        const mimeType = filePath(url)?.mime
        if (!mimeType) return;  // mime type not detected
        const saveTo = dirSave ? dirSave : listPathSavetoRoll.includes(mimeType) ? 'roll' : 'document'

        setProgress(0)
        setDownloading(true);

        return downloadInstance.current.downloadFile(url)?.progress((received: string, total: string) => {
            setProgress(Number((Number(received) / Number(total) * 100).toFixed(0)));
        }).then((res: FetchBlobResponse) => {
            console.info('FetchBlobResponse', res);
            
            switch (saveTo) {
                case 'roll':
                    return CameraRoll.save(res.data).then((value) => {
                        setProgress(100)
                        return res
                    }).catch((err) => {
                        setError(err)
                    })
                case 'document':
                default:
                    if (Platform.OS === 'ios') {
                        // ReactNativeBlobUtil.fs.writeFile(configfb.path, res.data, 'base64');
                        ReactNativeBlobUtil.ios.previewDocument(res.data);
                        setProgress(100)
                        return res
                    } else {
                        const fileData = {
                            name: fileName,
                            parentFolder: '',
                            mimeType: mimeType
                        }

                        return ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
                            fileData,
                            'Download', // Media Collection to store the file in ("Audio" | "Image" | "Video" | "Download")
                            res.data
                        ).then((value) => {
                            setProgress(100)
                            return res
                        }).catch((err) => {
                            setError(err)
                        })
                    }
            }
        }).catch(error => {
            setError(error)
        }).finally(() => {
            setDownloading(false);
        });
    }, []);


    const cancel = useCallback(() => {
        downloadInstance.current.task?.cancel();
    }, [])

    return {
        progress,
        error,
        isDownloading,
        download,
        cancel
    }
}