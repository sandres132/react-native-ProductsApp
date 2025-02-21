import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';
import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routers/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}

export const RegisterScreen = ({ navigation }: Props ) => {

    const { height } = useWindowDimensions();
    const [isPosting, setIsPosting] = useState(false);
    const { register } = useAuthStore();
    const [isHidden, setIsHidden] = useState(true);
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: ''
    })

    const onRegister = async () => {
        // aqui se pueden validar regex entre otras cosas antes de enviar peticiones erroneas al backend
        if ( form.email.length === 0 || form.password.length <= 5 || form.fullName.length <= 3 ) {
            return;
        }

        setIsPosting(true);
        const wasSuccessful = await register( form.email, form.password, form.fullName );
        setIsPosting(false);
        
        if ( wasSuccessful ) return;

        Alert.alert('Error', 'Error en los campos del formulario');
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>

                <Layout style={{ paddingTop: height * 0.30 }}>
                    <Text category='h1'>Crear cuenta</Text>
                    <Text category='p2'>Por favor, crea una cuenta para continuar</Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>

                    <Input
                        placeholder='Nombre completo'
                        accessoryLeft={ <MyIcon name='person-outline' /> }
                        value={ form.fullName }
                        onChangeText={ fullName => setForm({ ...form, fullName })}
                        style={{ marginBottom: 10 }}
                    />

                    <Input
                        placeholder='Correo electronico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={ form.email }
                        onChangeText={ email => setForm({ ...form, email })}
                        accessoryLeft={ <MyIcon name='at-outline' /> }
                        style={{ marginBottom: 10 }}
                    />

                    <Input
                        placeholder='Contraseña'
                        autoCapitalize='none'
                        accessoryLeft={ <MyIcon name='lock-outline' /> }
                        value={ form.password }
                        onChangeText={ password => setForm({ ...form, password })}
                        secureTextEntry={isHidden}
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
                        onPress={ onRegister }
                        // appearance='ghost'
                    >
                        Crear
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
                    <Text>¿Ya tienes una cuenta?</Text>
                    <Text
                        status='primary'
                        category='s1'
                        onPress={() => navigation.goBack() }
                    >
                        {' '} ingresar
                    </Text>
                </Layout>

            </ScrollView>
        </Layout>
    )
}