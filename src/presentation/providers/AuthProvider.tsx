import { PropsWithChildren, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { RootStackParams } from '../routers/StackNavigator'
import { useAuthStore } from '../screens/store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren ) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, [])

    useEffect(() => {
      if ( status !== 'checking' ) {
        if ( status === 'authenticated' ) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            })
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            })
        }
      }
    }, [status])
    

  return (
    <>{ children }</>
  )
}
