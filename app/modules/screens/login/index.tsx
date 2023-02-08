import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { backToTopAppStack } from 'app/modules/navigation'
import { AuthStackParamList } from 'app/modules/navigation/AppParamsList'
import { postLoginRequest } from 'app/redux/actions/user'
import { AppButton } from 'components/button/AppButton'
import { AppText } from 'components/text/AppText'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useInitApp } from 'shared/hooks/initApp/useInitApp'

interface IProps {

}

const LoginScreen = React.memo((props: IProps) => {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList, 'LoginScreen'>>()
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { promiseInitAfterLogin } = useInitApp();

    const onLogin = useCallback(async () => {

        const initAfterLogin = async (data?: any) => {
            promiseInitAfterLogin().then((value: boolean) => {
                if (value) backToTopAppStack()
            })
        }

        dispatch(postLoginRequest({ email: '', password: '' }, { onSuccess: initAfterLogin }));
    }, [dispatch, promiseInitAfterLogin]);

    const onForgotPassword = useCallback(() => {
        navigation.navigate('ForgotPasswordScreen')
    }, [navigation])

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText>{t('login')}</AppText>
        <AppButton
            text={t('login')}
            onPress={onLogin}
        />
        <AppButton
            text={'Forgot Password'}
            onPress={onForgotPassword}
        />
    </View>
})

export default LoginScreen
