import { StackNavigationOptions } from '@react-navigation/stack';
import { BackButton } from 'app/modules/components/navigation/BackButton';
import { AppText } from 'app/modules/components/text/AppText';
import React from 'react';
import { Platform } from 'react-native';
import theme from 'shared/theme';

export const createDefaultStackNavigationOptions = (backIcon?: ({ tintColor }: any) => React.ReactNode): StackNavigationOptions => {
    const defaultNavigationOptions: StackNavigationOptions = {
        headerTitleStyle: {
            color: theme.color.navigationTintColor,
            // fontFamily: theme.font.Medium,
            fontSize: 18,
        },
        headerTitle: ({ style, children, allowFontScaling }: any) =>
            children && typeof children === 'string' ? <AppText>{children}</AppText> : null,
        headerTitleAlign: 'center',
        headerBackTitleStyle: {
            color: theme.color.navigationTintColor,
            // fontFamily: theme.font.ExtraBold
        },
        headerStyle: {
            backgroundColor: theme.color.navigationBackgroundColor,
            borderBottomWidth: 0,
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
                height: 0,
                width: 0,
            },
            elevation: 0,
            height: Platform.select({
                ios: 80,
            }),
        },
        headerStatusBarHeight: Platform.select({
            android: theme.dimensions.p16,
        }),
        headerRightContainerStyle: {
            paddingRight: theme.dimensions.p32,
        },
        headerLeftContainerStyle: {
            paddingLeft: theme.dimensions.p32,
        },
        headerTintColor: theme.color.black,
        headerTitleAllowFontScaling: false,
        headerBackTitleVisible: false,
        headerBackTestID: 'navigation-go-back-button',
        title: '',
        headerLeft: backIcon ? backIcon : ({ tintColor }: any) => <BackButton tintColor={tintColor} />,
        // headerRight,
        headerPressColor: 'transparent',
        headerMode: 'screen',
        presentation: 'card',
    };

    return defaultNavigationOptions;
};