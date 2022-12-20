import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordScreen from 'app/modules/screens/forgotPassword';
import LoginScreen from 'app/modules/screens/login';
import React from 'react';
import { AuthStackParamList } from '../AppParamsList';
import { createDefaultStackNavigationOptions } from '../configHeader';

const Stack = createStackNavigator<AuthStackParamList>();

interface IProps {
}

const AuthStack = (props: IProps) => {
    const defaultOptions = createDefaultStackNavigationOptions();

    return <Stack.Navigator screenOptions={defaultOptions} initialRouteName={'LoginScreen'}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} options={{ headerTitle: 'ForgotPasswordScreen' }} />
    </Stack.Navigator>;
};

export default AuthStack;
