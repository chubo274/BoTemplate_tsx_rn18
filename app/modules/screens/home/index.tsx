import ImageSource from 'app/assets/images'
import { UserRepository } from 'app/data/repositories/user'
import { selectUserReducer } from 'app/redux/selectors/user'
import { AppInput } from 'components/input/AppInput'
import { DropPicker } from 'components/picker/DropPicker'
import { AppButton } from 'components/button/AppButton'
import { AppText } from 'components/text/AppText'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'

interface IProps {

}

const HomeScreen = React.memo((props: IProps) => {
    const userReducer = useSelector(selectUserReducer);
    const [currentValue, setCurrentValue] = useState(1);

    useEffect(() => {
        const getToken = async () => {
            const userToken = await UserRepository.getToken();
            console.info('userToken', userToken);
            console.info('userReducer', userReducer);
        }
        getToken()
    }, [userReducer]);

    return <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
        <AppText>Home Screen</AppText>
        <AppButton text='ádf'/>
        <View style={{ width: '100%' }}>
            <DropPicker
                listValueSelect={[1, 2, 3, 4, 5, 6]} currentValue={currentValue} onSelected={(value) => { setCurrentValue(value) }}
                renderItemCurrentValue={(currentValue) => <AppInput value={currentValue} editable={false} pointerEvents={'none'} rightIcon={ImageSource.ic_arrow_down} />}
                renderItemDropDown={(item, index) => <AppInput value={item} editable={false} pointerEvents={'none'} rightIcon={ImageSource.ic_arrow_down} />}
            />
        </View>
    </ScrollView>
})

export default HomeScreen
