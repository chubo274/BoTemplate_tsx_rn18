import React, { useState } from 'react'
import { Image, ImageStyle, StyleProp, StyleSheet, View } from 'react-native'
import theme from 'shared/theme'

interface IProps {
    source: number
    name: string
    imgStyle?: StyleProp<ImageStyle>
}

export const TabBarIcon = React.memo((props: IProps) => {
    const { source, imgStyle } = props
    const [badge,] = useState(0)

    // useEffect(() => {
    //     const subscription = EventEmitter.addListener(EventNames.updateTabBarBadge, data => {
    //         const { name: tabName, count } = data;
    //         if (tabName === name) {
    //             setBadge(count);
    //         }
    //     });
    //     return () => {
    //         subscription.remove();
    //     };
    // }, [name, setBadge]);

    return <View>
        <Image style={[styles.imgIcon, imgStyle]} source={source} resizeMode={'contain'} />
        {badge ? <View style={styles.badge}></View> : null}
    </View>
})

const styles = StyleSheet.create({
    imgIcon: {
        width: theme.dimensions.makeResponsiveSize(23),
        height: theme.dimensions.makeResponsiveSize(23)
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: -8,
        backgroundColor: theme.color.blueSky,
        borderRadius: 10,
        width: theme.dimensions.makeResponsiveSize(20),
        height: theme.dimensions.makeResponsiveSize(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ffffff'
    }
})
