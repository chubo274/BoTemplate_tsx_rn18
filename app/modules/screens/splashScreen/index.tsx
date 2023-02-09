import React, { useLayoutEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useInitApp } from 'shared/hooks/initApp/useInitApp';

const SplashScreen = () => {
    const didMount = useRef<boolean>(false);
    const { initStateApp } = useInitApp()

    useLayoutEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            initStateApp()
        }
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