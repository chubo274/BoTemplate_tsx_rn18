import { StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { selectLanguageReducer } from 'app/redux/selectors/language'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import NavigationService from 'shared/helpers/NavigationService'
import { configureLocalization, LANGUAGES } from 'shared/localization'
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

    const languageReducer = useSelector(selectLanguageReducer);

    useLayoutEffect(() => {
        configureLocalization(languageReducer.data ?? LANGUAGES.VIETNAM);
    }, [languageReducer.data]);

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
