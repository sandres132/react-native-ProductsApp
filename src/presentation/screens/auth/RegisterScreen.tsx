import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';
import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routers/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}

export const RegisterScreen = ({ navigation }: Props ) => {

    const { height } = useWindowDimensions();
    const [isHidden, setIsHidden] = useState(true);

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
                        style={{ marginBottom: 10 }}
                    />

                    <Input
                        placeholder='Correo electronico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        accessoryLeft={ <MyIcon name='at-outline' /> }
                        style={{ marginBottom: 10 }}
                    />

                    <Input
                        placeholder='Contraseña'
                        autoCapitalize='none'
                        accessoryLeft={ <MyIcon name='lock-outline' /> }
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
                        accessoryRight={ <MyIcon name='arrow-forward-outline' white /> }
                        onPress={() => {}}
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