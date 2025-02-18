import { createStackNavigator } from '@react-navigation/stack';

import { LoadingScreen,
    HomeScreen,
    ProductScreen, 
    LoginScreen,
    RegisterScreen} from '../screens';

export type RootStackParams ={
    HomeScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    LoadingScreen: undefined;
    ProductScreen: { productId: string };
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='LoadingScreen'
            screenOptions={{

                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                }
            }}
        >
            <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='ProductScreen' component={ProductScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
        </Stack.Navigator>
    )

}