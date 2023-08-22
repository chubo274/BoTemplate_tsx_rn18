import { RenderImage } from 'components/image/RenderImage';
import { PlayAudio } from 'components/playVideo/PlayAudio';
import { PlayVideo } from 'components/playVideo/PlayVideo';
import React, { useMemo, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import WebView from 'react-native-webview';
import { FileTypeUpload, viewFileByGoogleViewLink } from 'shared/helpers/constant';
import { useAppTheme } from 'shared/theme';

export interface IPreviewFileData {
    type: FileTypeUpload,
    uri: string,
    name: string
}

interface IProps {
    data: IPreviewFileData
    isActive?: boolean
}

export const PreviewFile = React.memo((props: IProps) => {
    const { data, isActive } = props
    const [isWebViewVisible, setWebViewVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const theme = useAppTheme()

    const handleLoadError = (syntheticEvent: any) => {

        if (!syntheticEvent?.loading && !syntheticEvent?.title) {
            setWebViewVisible(false);
            setTimeout(() => {
                setWebViewVisible(true);
            }, 100);
        }
        if (!syntheticEvent?.loading && syntheticEvent?.title) {
            setIsLoading(false)
        }
    };

    const renderFile = useMemo(() => {
        switch (data.type) {
            case FileTypeUpload.Image:
                return <View>
                    <RenderImage source={data.uri} style={{ width: '100%', height: '100%' }} />
                </View>
            case FileTypeUpload.Audio:
                return <View>
                    <PlayAudio videoURl={data.uri} playing={isActive} />
                </View>
            case FileTypeUpload.Video:
                return <View>
                    <PlayVideo videoURl={data.uri} playing={isActive} />
                </View>
            case FileTypeUpload.Other:
                return <View style={{ flex: 1, position: 'relative' }}>
                    {
                        Platform.OS === 'android' ? <>
                            {isActive && isWebViewVisible ?
                                <WebView
                                    nestedScrollEnabled
                                    onNavigationStateChange={handleLoadError}
                                    source={{ uri: viewFileByGoogleViewLink(data.uri)  }}
                                />
                                : <View />}
                            {isActive && isWebViewVisible && isLoading ?
                                <View style={{ height: theme.dimensions.deviceHeight, width: theme.dimensions.deviceWidth, position: 'absolute', backgroundColor: 'black', zIndex: 10 }}>
                                </View>
                                : <View />}
                        </> : <>
                            <WebView
                                nestedScrollEnabled
                                onLoadEnd={() => setIsLoading(false)}
                                // onNavigationStateChange={handleLoadError}
                                source={{ uri: data.uri }}
                            />
                        </>
                    }

                </View>
            default:
                return <View />
        }
    }, [data.type, data.uri, isActive, isLoading, isWebViewVisible, theme.dimensions.deviceHeight, theme.dimensions.deviceWidth])

    return <>
        {renderFile}
    </>
})