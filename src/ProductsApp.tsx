import '../gesture-handler.native';

import { useColorScheme } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/routers/StackNavigator';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const ProductsApp = () => {

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light;
    const backgroundColor = ( colorScheme === 'dark' )
        ? theme['color-basic-800']
        : theme['color-basic-100']

    return (
        <QueryClientProvider client={queryClient}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider 
                { ...eva }
                theme={ theme }
            >
                <NavigationContainer theme={{
                    dark: colorScheme === 'dark',
                    fonts: DefaultTheme.fonts,
                    colors: {
                        primary: theme['color-primary-500'],
                        background: backgroundColor,
                        card: theme['color-basic-100'],
                        text: theme['text-basic-color'],
                        border: theme['color-basic-800'],
                        notification: theme['color-primary-500'],
                    },

                }}>
                    <AuthProvider>
                        <StackNavigator/>
                    </AuthProvider>
                </NavigationContainer>
            </ApplicationProvider>
        </QueryClientProvider>
    )
}