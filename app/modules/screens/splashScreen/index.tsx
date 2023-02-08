import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useInitApp } from 'shared/hooks/initApp/useInitApp';

const SplashScreen = () => {
    const { initStateApp } = useInitApp()

    useLayoutEffect(() => {
        initStateApp()
    }, [initStateApp])

    return <View style={styles.container}>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
    }
});

export default SplashScreen