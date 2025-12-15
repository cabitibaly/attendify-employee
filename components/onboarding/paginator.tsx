import { ItemType } from '@/interface/slideType'
import React from 'react'
import { Animated, View, useWindowDimensions } from 'react-native'

interface Props {
    data: ItemType[]
    scrollX: Animated.Value
}

const Paginator = ({ data, scrollX }: Props) => {

    const { width } = useWindowDimensions()


    return (
        <View className='flex-row h-16'>
            {
                data.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

                    const dotRange = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: 'clamp',
                    })

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp',
                    })

                    return (
                        <Animated.View key={i.toString()} style={{width: dotRange, opacity}} className='h-[10px] bg-turquoise-8 mx-2 rounded-full' />
                    )
                })
            }
        </View>
    )
}

export default Paginator