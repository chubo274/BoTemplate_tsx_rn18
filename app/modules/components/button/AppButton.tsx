import { AppText } from 'components/text/AppText'
import React, { ReactNode } from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import theme from 'shared/theme'

interface IAppButton {
    text?: string
    textStyle?: TextStyle
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    style?: ViewStyle
    disabled?: boolean
    onPress?: () => void
}

export const AppButton = React.memo((props: IAppButton) => {
    const { text, style, textStyle, disabled, leftIcon, rightIcon, onPress } = props
    return <TouchableOpacity activeOpacity={0.6}
        style={[styles.defaultTouch, style, disabled && { backgroundColor: theme.color.grey2 }]}
        onPress={onPress}
        disabled={disabled}
    >
        {leftIcon}
        <View style={{ margin: 4 }} >
            <AppText style={[styles.defaultText, textStyle, disabled && { color: theme.color.grey2 }]}>{text}</AppText>
        </View>
        {rightIcon}
    </TouchableOpacity>
})

const styles = StyleSheet.create({
    defaultTouch: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: theme.dimensions.p12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    defaultText: {
        // fontFamily: theme.font.Bold,
        fontSize: theme.fontSize.p16,
        color: theme.color.activeBlue
    },
})
