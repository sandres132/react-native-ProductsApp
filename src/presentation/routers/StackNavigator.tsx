import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';

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

    const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
        return {
            cardStyle: {
                opacity: current.progress,
            }
        }
    }

    return (
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={{

                headerShown: false,
                cardStyleInterpolator: fadeAnimation,
            }}
        >
            <Stack.Screen
                options={{ cardStyleInterpolator: fadeAnimation }}
                name='LoadingScreen'
                component={LoadingScreen}
            />
            <Stack.Screen
                options={{ cardStyleInterpolator: fadeAnimation }}
                name='HomeScreen'
                component={HomeScreen}
            />
            <Stack.Screen
                options={{ cardStyleInterpolator: fadeAnimation }}
                name='LoginScreen'
                component={LoginScreen}
            />
            <Stack.Screen
                options={{ cardStyleInterpolator: fadeAnimation }}
                name='RegisterScreen'
                component={RegisterScreen}
            />
            <Stack.Screen name='ProductScreen' component={ProductScreen} />
        </Stack.Navigator>
    )

}