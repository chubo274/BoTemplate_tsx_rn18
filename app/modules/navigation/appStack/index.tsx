import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { createDefaultStackNavigationOptions } from '../configHeader'
import { AppStackParamList } from '../AppParamsList'
import AppTab from './AppTab'

const Stack = createStackNavigator<AppStackParamList>()

interface IProps {
}

const AppStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions()

    return <Stack.Navigator screenOptions={defaultOptions} initialRouteName={'AppTab'}>
        <Stack.Screen name='AppTab' component={AppTab} options={{ headerShown: false }} />
    </Stack.Navigator>
}

export default AppStack
