import { useHeaderHeight } from '@react-navigation/elements';
import ImageSource from 'app/assets/images';
import { RenderImage } from 'components/image/RenderImage';
import { IAppToastStatus } from 'components/toast/AppToast';
import { Pause, SpeakerSimpleHigh } from 'phosphor-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { emitShowToast } from 'shared/helpers/function';
import { ITheme, useAppTheme } from 'shared/theme';

interface IPlayVideo {
    videoURl: string
    playing?: boolean // autoPlaying and Playing
}

const widthMedia = Dimensions.get('window').width
const heightMedia = Dimensions.get('window').height * 0.8

export const PlayAudio = React.memo((props: IPlayVideo) => {
    const { t } = useTranslation()
    const theme = useAppTheme();
    const { videoURl, playing } = props
    const headerHeight = useHeaderHeight();
    const styles = useStyles(theme, headerHeight);
    const [isPlaying, setIsPlaying] = useState(playing)
    const isFirstLoaded = useRef<boolean>(false)
    const [isLoading, setIsLoading] = useState(false)

    const renderIconPlay = useCallback(() => {
        if (isPlaying)
            return <Pause size={40} color="#FFFFFF" weight="duotone" />
        return <SpeakerSimpleHigh size={40} color="#FFFFFF" weight="duotone" />
    }, [isPlaying])

    return (
        <View style={styles.container}>
            <View style={styles.viewLoading} pointerEvents={isLoading ? undefined : 'none'}>
                {isLoading
                    ? <RenderImage source={ImageSource.gif_loading_spinner} style={styles.imgGif} />
                    : renderIconPlay()
                }
            </View>
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
                onPlaybackRateChange={(e: any) => setIsPlaying(Boolean(e?.playbackRate))}
                onError={(e: any) => emitShowToast({ isShowIconLeft: true, status: IAppToastStatus.Error, toastMessage: t('cantProcessFile') })}
            />
        </View >
    )
})

const useStyles = (theme: ITheme, headerHeight: number) => StyleSheet.create({
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
        top: 60,
        width: theme.dimensions.deviceWidth,
        height: (theme.dimensions.deviceHeight - headerHeight) - 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    imgGif: {
        width: 40,
        height: 40,
    },
});
