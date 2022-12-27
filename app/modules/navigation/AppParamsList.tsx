// stack in tab bar
export interface AppTabParamList {
    HomeTab: undefined
    ProfileTab: undefined
}

export type HomeStackParamList = {
    HomeScreen: undefined
} & AppStackParamList & AppTabParamList;

export type ProfileStackParamList = {
    ProfileScreen: undefined
} & AppStackParamList & AppTabParamList;

// all screen had auth
export type AppStackParamList = {
    AppTab: undefined
    HomeScreen: undefined
    ProfileScreen: undefined
} & AppTabParamList;

// all screen no had auth
export type AuthStackParamList = {
    LoginScreen: undefined
    ForgotPasswordScreen: undefined
}

export type AllRouteParamList = AppStackParamList & AuthStackParamList;
