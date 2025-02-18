import { Button, Icon, Layout, Text } from '@ui-kitten/components';

export const LoadingScreen = () => {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>LoadingScreen</Text>


            <Button
                accessoryRight={ <Icon name='facebook' /> }
                accessoryLeft={ <Icon name='facebook' /> }
            >
                cerrar sesion
            </Button>
            {/* <Icon name='facebook' /> */}
        </Layout>
    )
}