import { Layout, Spinner } from '@ui-kitten/components';
import { View, Text } from 'react-native';

export const FullScreenLoader = () => {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner
                size='giant'
            />
        </Layout>
    )
}