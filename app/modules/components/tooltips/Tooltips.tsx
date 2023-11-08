import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Popover from 'react-native-popover-view'
import { PublicPopoverProps } from 'react-native-popover-view/dist/Popover'
import { ITheme, useAppTheme } from 'shared/theme'


interface IPropsAppToolTips extends PublicPopoverProps {
    contentTooltip: React.ReactNode
    children: React.ReactNode
    styleContainerTooltip?: StyleProp<ViewStyle>
}

const AppToolTips = (props: IPropsAppToolTips) => {
    const { contentTooltip, children, styleContainerTooltip, ...rest } = props
    const theme = useAppTheme()
    const styles = useStyles(theme)
    return (
        <>
            <Popover
                from={contentTooltip}
                {...rest}
            >
                <View style={[styles.totalWraper, styleContainerTooltip]}>
                    {children}
                </View>
            </Popover>
        </>
    )
}
export default AppToolTips

const useStyles = (theme: ITheme) => StyleSheet.create({
    totalWraper: {
        padding: theme.dimensions.p8
    }
})