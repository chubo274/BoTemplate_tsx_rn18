import { selectUserReducer } from 'app/redux/selectors/user';
import { AppText } from 'components/text/AppText';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

interface IProps {

}

const HomeScreen = React.memo((props: IProps) => {
    const userReducer = useSelector(selectUserReducer);

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText>Home Screen</AppText>
    </View>
});

export default HomeScreen;