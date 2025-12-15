import slides from '@/data/slides'
import React, { useRef, useState } from 'react'
import { Animated, FlatList, View, ViewToken } from 'react-native'
import NextButton from './nextButton'
import OnboardingItem from './onboardingItem'
import Paginator from './paginator'

const Onboarding = () => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(0);
    const sildesRef = useRef<FlatList<any> | null>(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {            
            setCurrentIndex(viewableItems[0].index);        
        }
    ).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = () => {
        if (currentIndex != null && currentIndex < slides.length - 1) {
            sildesRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true })
        } else {
            console.log('fin')
        }        
    }

    return (
        <View className='flex-1 bg-transparent items-center justify-center'>
            <View style={{flex: 3}}>
                <FlatList            
                    data={slides} 
                    renderItem={({item}) => <OnboardingItem item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    pagingEnabled={true}       
                    showsHorizontalScrollIndicator={false}     
                    bounces={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={sildesRef}
                />            
            </View>
            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex! + 1) * (100 / slides.length) } />
        </View>
    )
}

export default Onboarding