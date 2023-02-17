import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NavigationService from 'shared/helpers/NavigationService'
import RootStack from './modules/navigation'
import { persistor, store } from './redux/store'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <NavigationContainer ref={(ref: NavigationContainerRef<any>) => NavigationService.setTopLevelNavigator(ref)}>
                        <Host>
                            <StatusBar barStyle={Platform.select({ android: 'light-content', ios: 'dark-content' })} />
                            <RootStack />
                            {/* <AppToast />*/}
                        </Host>
                    </NavigationContainer>
                </GestureHandlerRootView>
            </PersistGate>
        </Provider>
    );
}

export default App
