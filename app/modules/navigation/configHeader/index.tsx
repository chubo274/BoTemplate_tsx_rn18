import { StackNavigationOptions } from '@react-navigation/stack'
import { BackButton } from 'app/modules/components/navigation/BackButton'
import { AppText } from 'app/modules/components/text/AppText'
import React from 'react'
import { Platform } from 'react-native'
import theme from 'shared/theme'
import { globalShadowStyle } from 'shared/theme/globalStyle'

export const CreateHeaderDefault = (): StackNavigationOptions => {
    const headerOption: StackNavigationOptions = {
        headerTitleStyle: {
            color: theme.color.activeBlue,
            // fontFamily: theme.font.Medium,
            fontSize: 18
        },
        headerTitle: ({ style, children, allowFontScaling }: any) =>
            children && typeof children === 'string' ? <AppText>{children}</AppText> : null,
        headerTitleAlign: 'left',
        headerBackTitleStyle: {
            color: theme.color.navigation.navigationTintColor
            // fontFamily: theme.font.ExtraBold
        },
        headerStyle: {
            backgroundColor: theme.color.navigation.navigationBackgroundColor,
            height: Platform.select({
                ios: 80
            }),
            borderBottomWidth: 0,
            ...globalShadowStyle.offShadow,
        },
        headerStatusBarHeight: Platform.select({
            android: theme.dimensions.p8
        }),
        headerRightContainerStyle: {
            paddingRight: theme.dimensions.p16
        },
        headerLeftContainerStyle: {
            paddingLeft: theme.dimensions.p16
        },
        headerTintColor: theme.color.activeBlue,
        headerTitleAllowFontScaling: false,
        headerBackTitleVisible: false,
        headerBackTestID: 'navigation-go-back-button',
        title: '',
        headerLeft: ({ tintColor }: any) => <BackButton tintColor={tintColor} />,
        // headerRight,
        headerPressColor: 'transparent',
        headerMode: 'screen',
        presentation: 'card'
    };

    return headerOption
}
