import { AppText } from 'components/text/AppText';
import React from 'react';
import { View } from 'react-native';

interface IProps {

}

const ForgotPasswordScreen = React.memo((props: IProps) => {

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText>forgotPassword Screen</AppText>
    </View>
});

export default ForgotPasswordScreen;