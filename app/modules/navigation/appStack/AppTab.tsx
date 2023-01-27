import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from 'app/modules/screens/home'
import ProfileScreen from 'app/modules/screens/profile'
import { CustomTabBar } from 'components/navigation/CustomTabBar'
import React from 'react'
import { AppTabParamList, HomeStackParamList, ProfileStackParamList } from '../AppParamsList'
import { CreateHeaderDefault } from '../configHeader'

const Tab = createBottomTabNavigator<AppTabParamList>()
const Home = createStackNavigator<HomeStackParamList>()
const Profile = createStackNavigator<ProfileStackParamList>()

interface IProps {

}

const HomeStack = (props: IProps) => {
    const defaultOptions = CreateHeaderDefault()

    return <Home.Navigator screenOptions={defaultOptions} initialRouteName={'HomeScreen'}>
        <Home.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
    </Home.Navigator>
}

const ProfileStack = (props: IProps) => {
    const defaultOptions = CreateHeaderDefault()

    return <Profile.Navigator screenOptions={defaultOptions} initialRouteName={'ProfileScreen'}>
        <Profile.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false }} />
    </Profile.Navigator>
}

const AppTab = (props: IProps) => {
    return <Tab.Navigator
        initialRouteName={'HomeTab'}
        screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarAllowFontScaling: false,
        }}
        tabBar={props => <CustomTabBar {...props} />}
    >
        <Tab.Screen name='HomeTab' component={HomeStack} options={{}} />
        <Tab.Screen name='ProfileTab' component={ProfileStack} options={{}} />
    </Tab.Navigator>
}

export default AppTab
