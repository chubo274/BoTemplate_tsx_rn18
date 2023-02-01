import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useInitApp } from 'shared/hooks/initApp/useInitApp';

const SplashScreen = () => {
    useInitApp()

    return <View style={styles.container}>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
    }
});

export default SplashScreen