import { backToTopAuthStack } from 'app/modules/navigation'
import { changeAppLanguage } from 'app/redux/actions/language'
import { AppButton } from 'components/button/AppButton'
import { AppText } from 'components/text/AppText'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { LANGUAGES } from 'shared/localization'

interface IProps {

}

const ProfileScreen = React.memo((props: IProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onLogout = useCallback(() => {
        backToTopAuthStack()
    }, [])

    const onChangeLanguage = useCallback((value: LANGUAGES) => {
        dispatch(changeAppLanguage(value))
    }, [dispatch])

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText>Profile Screen</AppText>
        <AppButton
            text={`Back to ${t('login')}`}
            onPress={onLogout}
        />
        <AppButton
            text={'Change language to VN'}
            onPress={() => onChangeLanguage(LANGUAGES.VIETNAM)}
        />
        <AppButton
            text={'Change language to EN'}
            onPress={() => onChangeLanguage(LANGUAGES.ENGLISH)}
        />
    </View>
})

export default ProfileScreen
