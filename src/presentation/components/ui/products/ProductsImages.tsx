import { useRef } from 'react';
import { Animated, useWindowDimensions, Image, StyleSheet } from 'react-native';

import { Layout } from '@ui-kitten/components';

import { FadeInImage } from '../FadeInImage';

interface Props {
    images: string[];
}

export const ProductImages = ({ images }: Props) => {
    
    const scrollX = useRef( new Animated.Value(0) ).current;
    const { width } = useWindowDimensions();
    const containerWidth = width * 0.7;
    const lateralWidth = (width - containerWidth) / 2;

    return (
        ( images.length === 0)
            ? <Image  source={ require('../../../../assets/no-product-image.png') } style={{ width: 300, height: 300, marginTop: 10 }} />
            : <Animated.FlatList
                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX }}}],
                        { useNativeDriver: true }
                    )
                }
                data={ images }
                keyExtractor={ (item) => item }
                horizontal
                showsHorizontalScrollIndicator={ false }
                decelerationRate={0}
                snapToInterval={ containerWidth }
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: 70, paddingHorizontal: lateralWidth}}
                renderItem={ ({item, index}) => {
                    const inputRange = [
                        (index - 1) * containerWidth,
                        index * containerWidth,
                        (index + 1) * containerWidth,
                    ];

                    const outputRange = [0, -50, 0];
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange,
                    })

                    return (
                        <Layout style={[ styles.carrouselContainer, { width: containerWidth }]}>
                            <Animated.View style={{ transform: [{ translateY }] }}>
                                <FadeInImage
                                    uri={ item }
                                    style={[ styles.posterImage ]}  
                                />
                            </Animated.View>
                        </Layout>
                        
                    )
                }}
            />
    )
}

const styles = StyleSheet.create({
    carrouselContainer : {
        alignItems: 'center',
        justifyContent: 'center'
    },
    posterImage: {
        height: 300,
        width: 300,
        resizeMode: 'cover',
    }
})