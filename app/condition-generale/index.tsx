import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Index = () => {
    const clearStorage = async () => {
        try {
            await AsyncStorage.removeItem("@viewedOnboarding")
            router.replace("/")
        } catch (error) {
            console.log("Error clearing storage", error)
        }
    }

    return (
        <View className="flex-1 items-center justify-center gap-4">
            <Text>Index</Text>
            <TouchableOpacity onPress={clearStorage} className='px-4 py-2 bg-turquoise-8' activeOpacity={0.6}>
                <Text>BACK</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Index