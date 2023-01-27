import { StyleSheet } from 'react-native'

export const globalShadowStyle = StyleSheet.create({
    offShadow: {
        shadowColor: 'transparent',
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 0,
    },
    shadow: {
        shadowColor: '#0C4299',
        shadowOffset: {
            width: 0,
            height: 30,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    }
})
