import ImageSource from 'app/assets/images';
import { RenderImage } from 'components/image/RenderImage';
import { IAppToastStatus } from 'components/toast/AppToast';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import { emitShowToast } from 'shared/helpers/function';
import { ITheme, useAppTheme } from 'shared/theme';

interface IPlayVideo {
    videoURl: string
    playing?: boolean
}

const widthMedia = Dimensions.get('window').width
const heightMedia = Dimensions.get('window').height * 0.8

export const PlayVideo = React.memo((props: IPlayVideo) => {
    const { videoURl, playing } = props
    const { t } = useTranslation()
    const theme = useAppTheme();
    const styles = useStyles(theme);
    const isFirstLoaded = useRef<boolean>(false)
    const [isLoading, setIsLoading] = useState(false)

    const loadingView = useMemo(() => {
        if (!isLoading) return null
        return <TouchableOpacity disabled={true} style={styles.viewLoading}>
            <RenderImage source={ImageSource.gif_loading_spinner} style={styles.imgGif} />
        </TouchableOpacity>
    }, [isLoading, styles])

    return (
        <View style={styles.container}>
            {loadingView}
            <Video
                source={{ uri: videoURl }}
                controls={true}
                paused={!playing}
                onLoadStart={() => {
                    isFirstLoaded.current = false
                    setIsLoading(true)
                }}
                onProgress={() => {
                    if (!isFirstLoaded.current) {
                        setIsLoading(false)
                        isFirstLoaded.current = true
                    }
                }}
                style={styles.backgroundVideo}
                resizeMode={'cover'}
                onError={(e: any) => emitShowToast({ isShowIconLeft: true, status: IAppToastStatus.Error, toastMessage: t('cantProcessFile') })}
            />
        </View>
    )
})

const useStyles = (theme: ITheme) => StyleSheet.create({
    container: {
        flex: 1,
        width: widthMedia,
        height: heightMedia,
    },
    backgroundVideo: {
        zIndex: -99,
        width: widthMedia,
        height: heightMedia,
        backgroundColor: '#000000'
    },
    viewLoading: {
        position: 'absolute',
        width: widthMedia,
        height: heightMedia,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050',
    },
    imgGif: {
        width: 40,
        height: 40,
    },
});
