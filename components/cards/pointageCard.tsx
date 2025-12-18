import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import MapPin from '../svg/mapPin'

const PointageCard = () => {
    return (
        <View className='p-2.5 bg-turquoise-5/40 w-full rounded-xl flex-row items-center justify-between gap-2'>                
            <LinearGradient
                colors={['#006A6B', '#003B3C']}
                style={{
                    padding: 16,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}                    
            >                    
                <Text className='text-3xl text-white font-semibold'>18</Text>
                <Text className='text-xl text-white font-medium'>Jeu.</Text>
            </LinearGradient>
            <View className='flex-1 flex-col items-center justify-center gap-3'>
                <View className='w-full flex-row items-center justify-between'>
                    <View className='border-r border-gris-8 flex-1 flex-col items-center justify-end'>
                        <Text className='text-xl text-white font-medium'>08:00</Text>
                        <Text className='text-base text-white font-regular'>Arrivée</Text>
                    </View>
                    <View className='border-r border-gris-8 flex-1 flex-col items-center justify-center'>
                        <Text className='text-xl text-white font-medium'>16:00</Text>
                        <Text className='text-base text-white font-regular'>Départ</Text>
                    </View>
                    <View className='flex-1 flex-col items-center justify-center'>
                        <Text className='text-xl text-white font-medium'>08:00</Text>
                        <Text className='text-base text-white font-regular'>D. totale</Text>
                    </View>
                </View>
                <View className='flex-row gap-1.5 items-center justify-center'>
                    <MapPin color='#005758' size={18} />
                    <Text className='text-base text-white font-regular'>PowerTech SARL, site du 22</Text>
                </View>
            </View>
        </View>
    )
}

export default PointageCard