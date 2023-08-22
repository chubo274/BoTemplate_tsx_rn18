import React, { useCallback } from 'react';
import {Linking, StyleSheet, useWindowDimensions, Alert, TouchableOpacity} from 'react-native';
import HTML, { CustomRendererProps, RenderHTMLProps, TBlock } from 'react-native-render-html';
import WebView from 'react-native-webview';
import { AppFont } from 'shared/theme/fonts';
import Image from 'react-native-image-lazy-loading';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import {useTranslation} from 'react-i18next';
import theme from 'shared/theme';

interface IProps extends RenderHTMLProps {
    htmlContent?: string;
    onLinkPress?: (evt: any, href: string) => void;
    webViewStyle?: any;
    imageStyle?: any;
    contentStyle?: any;
    textProps?: any;
}

type Props = Omit<IProps, 'source'>;
const defaultContentWidth = '100%';

const HTMLRenderer = (props: Props) => {
    const { t } = useTranslation();
    const { width } = useWindowDimensions();
    const { htmlContent, onLinkPress, contentStyle, textProps, ...rest } = props;
    const progressSizeImg = useCallback((contentWidth: number | string, tnodeWidth: number, tnodeHeight: number, defaultStyle: any) => {
        const currentAspectRatio = tnodeWidth / tnodeHeight;
        if (tnodeWidth > 0) {
            if (tnodeWidth < contentWidth) { // within the allowable size
                return {
                    ...defaultStyle,
                    width: tnodeWidth,
                    height: tnodeHeight,
                    marginBottom: 5
                };
            } else {
                if (tnodeHeight > 0) { // has overWidth and has height
                    return {
                        ...defaultStyle,
                        width: contentWidth,
                        aspectRatio: currentAspectRatio,
                        marginBottom: 5
                    };
                } else { // has overWidth and hasn't height
                    return {
                        ...defaultStyle,
                        width: contentWidth,
                        aspectRatio: 16 / 9,
                        marginBottom: 5
                    };
                }
            }
        } else {
            return { // has no size
                ...defaultStyle,
                width: contentWidth,
                aspectRatio: 16 / 9,
                marginBottom: 5
            };
        }
    }, [])

    const customerRenderers = useCallback((props: Props) => {
        const contentWidth = parseInt(props?.contentStyle?.width) > 0 ? parseInt(props?.contentStyle?.width) : defaultContentWidth;
        return {
            img: (props: CustomRendererProps<TBlock>) => {
                const { tnode, style } = props;
                const tnodeWidth = tnode.attributes && parseInt(tnode.attributes.width) > 0 ? parseInt(tnode.attributes.width) : 0;
                const tnodeHeight = tnode.attributes && parseInt(tnode.attributes.height) > 0 ? parseInt(tnode.attributes.height) : 0;
                const src = tnode.attributes && tnode.attributes.src ? tnode.attributes.src : '';
                const sourceImg = {
                    uri: src
                };
                const longPress = (src: string) => {
                    Alert.alert(t('saveToCameraRoll'), t('saveToCameraRollConfirm'), [
                        {
                            text: t('cancel'),
                            style: 'cancel',
                        },
                        {text: t('save'), onPress: () => CameraRoll.save(src)},
                    ]);
                }
                if(src != '') {
                    return <TouchableOpacity onLongPress={() => longPress(src)}>
                        <Image
                            style={progressSizeImg(contentWidth, tnodeWidth, tnodeHeight, style)}
                            source={sourceImg}
                        />
                    </TouchableOpacity>
                }
            },
            iframe: (props: CustomRendererProps<TBlock>) => {
                const { tnode, style } = props;
                const src = tnode && tnode.attributes && tnode.attributes.src ? tnode.attributes.src : '';
                return <WebView
                    key={`${tnode?.id}`}
                    source={{ uri: src }}
                    style={[styles.customImage, style]}
                    javaScriptEnabled
                />;
            },
        };
    }, [progressSizeImg, t])

    const _onLinkPress = useCallback((evt: any, href: string) => {
        if (onLinkPress) {
            onLinkPress(evt, href);
        } else {
            Linking.openURL(href).catch(console.info);
        }
    }, [onLinkPress]);

    if (htmlContent) {
        return (
            <HTML
                defaultTextProps={{
                    allowFontScaling: false,
                    ...textProps
                }}
                renderers={customerRenderers(props)}
                renderersProps={{
                    a: {
                        onPress: _onLinkPress
                    }
                }}
                baseStyle={{
                    width: defaultContentWidth,
                    ...defaultTextStyle(theme),
                    ...contentStyle,
                }}
                // systemFonts={[
                //     theme.font.Thin,
                //     AppFont.Regular,
                //     AppFont.Medium,
                //     AppFont.Bold,
                // ]}
                contentWidth={width}
                {...rest}
                tagsStyles={{ ...tagStyles(theme), ...props.tagsStyles }}
                source={{ html: htmlContent }}
            />
        );
    }

    return null;
};

export const defaultTextStyle = (theme: ITheme) => {
    return {
        fontFamily: AppFont.Regular,
        fontSize: theme.fontSize.p13,
        color: '#081834',
    }
}

const tagStyles = (theme: ITheme) => {
    return {
        body: {
            ...defaultTextStyle(theme),
        },
        p: {
            ...defaultTextStyle(theme),
        },
        a: {
            ...defaultTextStyle(theme),
            color: 'blue'
        },
        strong: {
            ...defaultTextStyle(theme),
            fontFamily: AppFont.Bold,
        },
        li: { ...defaultTextStyle(theme), marginLeft: 6, marginBottom: 10, marginTop: -3, paddingBottom: 3 },
        ul: defaultTextStyle(theme),
        ol: defaultTextStyle(theme),
    }
}

export const createTagStyles = (textStyle: any) => {
    return {
        body: textStyle,
        p: textStyle,
        a: {
            ...textStyle,
            color: 'blue'
        },
        strong: {
            fontFamily: AppFont.Bold,
            ...textStyle,
        },
        li: { ...textStyle, marginLeft: 6, marginBottom: 10, marginTop: -3, paddingBottom: 3 },
        ul: textStyle,
        ol: textStyle,
    };
}

const styles = StyleSheet.create({
    customImage: {
        width: defaultContentWidth,
        aspectRatio: 16 / 9,
        opacity: 0.99
    }
});

export default React.memo(HTMLRenderer);
