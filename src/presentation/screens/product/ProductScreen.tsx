import { useRef } from "react"
import { StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { StackScreenProps } from "@react-navigation/stack"

import { Button, ButtonGroup, Input, Layout, useTheme } from "@ui-kitten/components"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Formik } from "formik"

import { genders, sizes } from "../../../config"
import { RootStackParams } from "../../routers/StackNavigator"
import { getProductById, updateCreateProduct } from "../../../actions"
import { FullScreenLoader, MyIcon, ProductImages } from "../../components/ui"
import { MainLayout } from "../../layouts/MainLayout";
import { Product } from '../../../domain/entities';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route }: Props ) => {

    const theme = useTheme();
    const queryClient = useQueryClient();

    // referencia de productId para poder usarlo en las pantallas de crear y actualizar el producto
    const productIdRef = useRef(route.params.productId);
    // const { productId } = route.params;

    //usequery
    const { data: product } = useQuery({
        queryKey: ['product', productIdRef.current],
        queryFn: () => getProductById(productIdRef.current),
    })

    //usemutation
    const mutation = useMutation({
        mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
        onSuccess( data: Product ) {
            productIdRef.current = data.id;

            // invalidar las query en cache 
            queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['product', productIdRef.current ] });

            // en ves de invalidar la query de este screen se puede hacer un set de la query en cache con la data actualizada sin embargo habria que mapear las imagenes que vienen sin el url tendriamos que mapear el resultado para que sea lo que espera nuestro query key
            // queryClient.setQueryData( ['product', productIdRef.current ], data );
            
        }
    })

    if (!product) {
        return (
            <MainLayout title="Loading...">
                <FullScreenLoader />
            </MainLayout>
        )
    }

    return (
        <Formik
            initialValues={ product }
            // validate={}
            onSubmit={ values => mutation.mutate(values) }
        >
            {
                ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <>
                        <MainLayout
                            title={ values.title }
                            subTitle={ `Precio: ${ values.price }` }
                        >
                            <ScrollView style={{ flex: 1 }}>
                                {/* Imagenes del producto */}
                                <Layout style={{ alignItems: 'center'}}>
                                    <ProductImages images={ values.images } />
                                </Layout>

                                {/* Formulario */}
                                <Layout style={{ marginHorizontal: 20 }}>
                                    <Input
                                        label='Title'
                                        value={ values.title }
                                        onChangeText={ handleChange('title') }
                                        style={{ marginVertical: 5 }}
                                    />
                                    <Input
                                        label='Slug'
                                        value={ values.slug }
                                        onChangeText={ handleChange('slug') }
                                        style={{ marginVertical: 5 }}
                                    />
                                    <Input
                                        label='Description'
                                        value={ values.description }
                                        onChangeText={ handleChange('description') }
                                        multiline
                                        numberOfLines={5}
                                        style={{ marginVertical: 5 }}
                                    />
                                </Layout>

                                {/* Precio e inventario */}
                                <Layout style={{ marginVertical: 5, marginHorizontal: 25, flexDirection: 'row', gap: 10 }}>
                                    <Input
                                        label='Precio'
                                        value={ values.price.toString() }
                                        onChangeText={ handleChange('price') }
                                        style={{ flex: 1 }}
                                        keyboardType="numeric"

                                    />
                                    <Input
                                        label='Stock'
                                        value={ values.stock.toString() }
                                        onChangeText={ handleChange('stock') }
                                        style={{ flex: 1 }}
                                        keyboardType="numeric"

                                    />
                                </Layout>

                                {/* Selectores */}
                                <ButtonGroup
                                    style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                                    size="small"
                                    appearance="outline"

                                >
                                    {
                                        sizes.map( (size) => (
                                            <Button
                                                key={size}
                                                onPress={ () => setFieldValue(
                                                    'sizes',
                                                    values.sizes.includes(size)
                                                        ? values.sizes.filter( s => s !== size)
                                                        : [ ...values.sizes, size]
                                                )}
                                                style={{
                                                    flex : 1,
                                                    backgroundColor: values.sizes.includes(size)
                                                        ? theme['color-primary-200'] : undefined
                                                }}
                                            >{ size }</Button>
                                        ))
                                    }
                                </ButtonGroup>

                                <ButtonGroup
                                    style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
                                    size="small"
                                    appearance="outline"
                                >
                                    {
                                        genders.map( gender => (
                                            <Button
                                                onPress={ () => setFieldValue('gender', gender)}
                                                key={ gender }
                                                style={{
                                                    flex : 1,
                                                    backgroundColor: values.gender.startsWith( gender )
                                                        ? theme['color-primary-200']
                                                        : undefined
                                                }}
                                            >{ gender }</Button>
                                        ))
                                    }
                                </ButtonGroup>
                                <Layout style={{ marginBottom: 200 }}/>
                            </ScrollView>
                        </MainLayout>

                        {/* Boton de guardar */}
                        <Button
                            accessoryLeft={ <MyIcon name="save-outline" height={ 30 } width={ 30 } white />}
                            onPress={ () => handleSubmit() }
                            style={ styles.FB }
                            disabled={ mutation.isPending }
                        >
                            Save
                        </Button>
                    </>
                )
            }
        </Formik>
    )
}

const styles = StyleSheet.create({
    FB: {
        position: 'absolute',
        bottom: 20,
        width: '95%',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 13,
        marginHorizontal: 10,
    },
})