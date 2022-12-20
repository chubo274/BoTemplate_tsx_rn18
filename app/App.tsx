import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationService from 'shared/helpers/NavigationService';
import RootStack from './modules/navigation';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={(ref: NavigationContainerRef<any>) => NavigationService.setTopLevelNavigator(ref)}>
        <RootStack />
        {/* <InAppNotification /> */}
      </NavigationContainer>
    </GestureHandlerRootView >
  );
};

export default App;