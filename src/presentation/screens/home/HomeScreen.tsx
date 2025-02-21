import { Layout, Text } from '@ui-kitten/components';
import { ActivityIndicator } from 'react-native';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { Query, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/ui/products/ProductList';
import { FAB } from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../routers/StackNavigator';

export const HomeScreen = () => {

    const queryClient = useQueryClient();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    // query no infinito
    // const { isLoading, data: products = [] } = useQuery({
    //     queryKey: ['products', 'infinite'],
    //     staleTime: 1000 * 60 *60, // 1 hour
    //     queryFn: () => getProductsByPage(0),
    // });

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 *60, // 1 hour
        initialPageParam: 0,

        // forma para query function sin uso de queryClient para meter mas info en el cache
        // queryFn: async(params) => {

        //     return await getProductsByPage( params.pageParam );
        // },

        // forma resumida para query function sin uso de queryClient para meter mas info en el cache
        // queryFn: async params => await getProductsByPage( params.pageParam ),

        // forma para query function con el uso de queryClient para meter mas info en el cache para la siguiente screen
        queryFn: async(params) => {

            const products = await getProductsByPage( params.pageParam );

            products.forEach( product => {
                queryClient.setQueryData( ['product', product.id], product);
            })

            return products;
        },

        getNextPageParam: ( lastPage, allPages ) => allPages.length,
    });

    return (
        <>
            <MainLayout
                title='TesloShop - Products'
                subTitle='Aplicacion Administrativa'
                // rightAction={ () => {} }
                // rightActionIcon='plus-outline'
            >
                {
                    isLoading
                        ? (<FullScreenLoader/>)
                        : (
                            <ProductList
                                products={ data?.pages.flat() ?? [] }
                                fetchNextPage={ fetchNextPage }
                            />
                        )
                }
            </MainLayout>

            <FAB
                iconName='plus-outline'
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                }}
                onPress={ () => navigation.navigate('ProductScreen', { productId: 'new' } )}
            />
        </>
    )
}