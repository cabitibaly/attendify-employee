import CongeCard from '@/components/cards/congeCard'
import { FilterIcon } from '@/components/svg/filterIcon'
import React from 'react'
import { ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native'

const Index = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 pb-4 pt-28 flex-1 w-full h-full gap-6"
        >
            <View className="w-full flex-row items-center justify-between gap-4">
                <View className="bg-turquoise-5/30 rounded-xl p-4 flex-1 flex-col items-center justify-center gap-1">
                    <Text className='text-gris-12 text-xl font-semibold'>14 jours</Text>
                    <Text className='text-gris-12 text-base font-regular'>restants</Text>
                </View>
                <View className="bg-turquoise-5/30 rounded-xl p-4 flex-1 flex-col items-center justify-center gap-1">
                    <Text className='text-gris-12 text-xl font-semibold'>6 jours</Text>
                    <Text className='text-gris-12 text-base font-regular'>utilisés</Text>
                </View>
            </View>
            <View className='w-full flex-row items-center justify-between'>
                <Text className='text-gris-12 text-xl font-medium'>Historique des congés</Text>
                <Pressable  className='border border-turquoise-9 p-1 rounded-lg flex-row items-center justify-center gap-1.5'>
                    <FilterIcon size={20} color='#30CFD0' />
                    <Text className='text-gris-12 text-base font-medium'>Filtre</Text>
                </Pressable>
            </View>
            <View className='w-full flex-col gap-4'>
                <CongeCard 
                    status='En attente'
                />
                <CongeCard 
                    status='Rejeté'
                />
                <CongeCard 
                    status='Approuvé'
                />
            </View>
            <TouchableOpacity activeOpacity={0.8} className='absolute bottom-10 left-4 px-4 py-5 w-full rounded-full bg-turquoise-8/70 items-center justify-center'>
                <Text className='text-xl text-gris-12 font-medium'>Nouvelle demande</Text>    
            </TouchableOpacity>               
        </ImageBackground>
    )
}

export default Index