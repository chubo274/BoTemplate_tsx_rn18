import { StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import NavigationService from 'shared/helpers/NavigationService'
import AppStack from './appStack'
import AuthStack from './authStack'

const Stack = createStackNavigator()

interface IProps {

}

export const backToTopAuthStack = () => {
    NavigationService.topLevelNavigator?.dispatch(StackActions.replace('Auth'))
}

export const backToTopAppStack = () => {
    NavigationService.topLevelNavigator?.dispatch(StackActions.replace('App'))
}

const RootStack = (props: IProps) => {
    return <Stack.Navigator
        initialRouteName={'App'}
        screenOptions={{
            headerMode: 'screen',
            presentation: 'card',
            headerShown: false,
            animationTypeForReplace: 'pop'
        }}
    >
        <Stack.Screen name={'App'} component={AppStack} />
        <Stack.Screen name={'Auth'} component={AuthStack} />
    </Stack.Navigator>
}

export default RootStack
