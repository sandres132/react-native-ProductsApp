import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';
import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routers/StackNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}

export const LoginScreen = ({ navigation }: Props ) => {

    const { login } = useAuthStore();
    const [isPosting, setIsPosting] = useState(false);
    const { height } = useWindowDimensions();
    const [isHidden, setIsHidden] = useState(true);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const onLogin = async() => {
        // aqui se pueden validar regex entre otras cosas antes de enviar peticiones erroneas al backend
        if ( form.email.length === 0 || form.password.length === 0 ) {
            return;
        }

        setIsPosting(true);
        const wasSuccessful = await login( form.email, form.password);
        setIsPosting(false);
        if ( wasSuccessful ) return;

        Alert.alert('Error', 'Credenciales incorrectas');
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>

                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Ingresar</Text>
                    <Text category='p2'>Por favor, ingresa tus credenciales para continuar</Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder='Correo electronico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={ form.email }
                        onChangeText={ value => setForm({ ...form, email: value })}
                        accessoryLeft={ <MyIcon name='at-outline' /> }
                        style={{ marginBottom: 10 }}
                    />

                    <Input
                        placeholder='Contraseña'
                        autoCapitalize='none'
                        accessoryLeft={ <MyIcon name='lock-outline' /> }
                        secureTextEntry={isHidden}
                        value={ form.password }
                        onChangeText={ password => setForm({ ...form, password })}
                        accessoryRight={ 
                            <Button
                                accessoryRight={ isHidden ? <MyIcon name='eye-off-2-outline' /> : <MyIcon name='eye-outline' /> }
                                onPress={() => setIsHidden(!isHidden)}
                                appearance='ghost'
                            /> 
                        }
                        style={{ marginBottom: 10 }}
                    />

                </Layout>

                {/* Space */}
                <Layout style={{ height: 10 }} />

                {/* Button */}
                <Layout>
                    <Button
                        disabled={ isPosting }
                        accessoryRight={ <MyIcon name='arrow-forward-outline' white /> }
                        onPress={ onLogin }
                        // appearance='ghost'
                    >
                        Ingresar
                    </Button>
                    
                </Layout>

                {/* Informacion para crear cuenta */}
                {/* Space */}
                <Layout style={{ height: 50 }} />

                <Layout
                    style={{
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <Text>¿No tienes cuenta?</Text>
                    <Text
                        status='primary'
                        category='s1'
                        onPress={() => navigation.navigate('RegisterScreen') }
                    >
                        {' '} crear cuenta
                    </Text>
                </Layout>

            </ScrollView>
        </Layout>
    )
}