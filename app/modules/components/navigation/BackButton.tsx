import ImageSource from 'app/assets/images';
import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationService from 'shared/helpers/NavigationService';
import theme from 'shared/theme';

interface IProps {
    tintColor?: string;
}

export const BackButton = React.memo((props: IProps) => {
    const { tintColor } = props;

    const goBack = useCallback(() => {
        NavigationService.pop();
    }, []);

    return <TouchableOpacity
        style={styles.container}
        hitSlop={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
        }}
        onPress={goBack}
        activeOpacity={0.8}
        testID={'navigation-go-back-button'}
    >
        <Image source={ImageSource.ic_back} style={[styles.img, { tintColor: tintColor }]} resizeMode={'contain'} />
    </TouchableOpacity>;
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: theme.dimensions.makeResponsiveSize(23),
        height: theme.dimensions.makeResponsiveSize(23),
    }
});