import ImageSource from 'app/assets/images';
import React, { useMemo } from 'react';
import { Image, ImageProps, ImageResizeMode, ImageSourcePropType } from 'react-native';

// @ts-ignore
interface IProps extends ImageProps {
    source?: ImageSourcePropType | string,
    resizeMode?: ImageResizeMode
}

export const RenderImage = (props: IProps) => {
    const { source, resizeMode = 'contain', ...rest } = props;

    const renderSource = useMemo(() => {
        if (!source) return ImageSource.img_fallback;
        if (typeof source === 'string') {
            return { uri: source }
        }
        return source
    }, [source])

    return <Image
        {...rest}
        source={renderSource}
        resizeMode={resizeMode}
    />
}