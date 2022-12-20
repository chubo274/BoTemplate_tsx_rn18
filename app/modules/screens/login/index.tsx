import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { backToTopAppStack } from 'app/modules/navigation';
import { AuthStackParamList } from 'app/modules/navigation/AppParamsList';
import { AppButton } from 'components/button/AppButton';
import { AppText } from 'components/text/AppText';
import React, { useCallback } from 'react';
import { View } from 'react-native';

interface IProps {

}

const LoginScreen = React.memo((props: IProps) => {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, 'LoginScreen'>>();
    const onLogin = useCallback(() => {
        backToTopAppStack();
    }, [backToTopAppStack]);

    const onForgotPassword = useCallback(() => {
        navigation.navigate('ForgotPasswordScreen')
    }, [navigation]);

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText>Login Screen</AppText>
        <AppButton
            text={'Login'}
            onPress={onLogin}
        />
        <AppButton
            text={'Forgot Password'}
            onPress={onForgotPassword}
        />
    </View>
});

export default LoginScreen;