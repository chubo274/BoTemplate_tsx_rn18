import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import ImageSource from 'app/assets/images'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import theme from 'shared/theme'
import { TabBarIcon } from './TabBarIcon'

export const CustomTabBar = (props: BottomTabBarProps) => {
    const { navigation, state, descriptors } = props
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const { name: routeName } = route

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate(route)
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    })
                };

                let source: number
                if (routeName === 'HomeTab') {
                    source = ImageSource.ic_tab_home
                } else {
                    source = ImageSource.ic_tab_profile
                }

                return (
                    <TouchableOpacity
                        key={routeName}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.item}
                    >
                        <TabBarIcon
                            imgStyle={{ tintColor: isFocused ? theme.color.navigationTintColor : '#BBBBBB' }}
                            source={source}
                            name={routeName}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: theme.dimensions.makeResponsiveSize(80),
        backgroundColor: theme.color.tabbarBackgroundColor,
        paddingBottom: theme.dimensions.makeResponsiveSize(20)
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
