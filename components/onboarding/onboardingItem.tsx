import { ItemType } from '@/interface/slideType'
import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'

const OnboardingItem = ({ item }: {item: ItemType}) => {
    const { width } = useWindowDimensions()

    return (
        <View style={{width}} className='p-4 flex-col items-start justify-end gap-4'>
            <Text className='text-[40px] text-gris-12 font-bold'>{item.title}</Text>
            <Text className='text-[24px] text-gris-11 font-normal'>{item.description}</Text>
        </View>
    )
}

export default OnboardingItem