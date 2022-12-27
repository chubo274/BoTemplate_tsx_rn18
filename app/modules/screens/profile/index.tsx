import { backToTopAuthStack } from 'app/modules/navigation'
import { AppButton } from 'components/button/AppButton'
import { AppText } from 'components/text/AppText'
import React, { useCallback } from 'react'
import { View } from 'react-native'

interface IProps {

}

const ProfileScreen = React.memo((props: IProps) => {
    const onLogout = useCallback(() => {
        backToTopAuthStack()
    }, [])

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText>Profile Screen</AppText>
        <AppButton
            text={'Back to Login'}
            onPress={onLogout}
        />
    </View>
})

export default ProfileScreen
