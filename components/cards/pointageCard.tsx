import { useAuth } from '@/hooks/auth/useAuth'
import { Pointage } from '@/interface/pointage'
import decimalToTime from '@/utils/decimalToTime'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'
import MapPin from '../svg/mapPin'

interface PointageCardProps {
    pointage: Pointage
}

const PointageCard = ({ pointage }: PointageCardProps) => {
    const { utilisateur } = useAuth()

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
                <Text className='text-3xl text-white font-semibold'>{pointage.arrive ? new Date(pointage.arrive).getDate() : "-"}</Text>
                <Text className='text-xl text-white font-medium'>
                    {
                        pointage.arrive ? new Date(pointage.arrive).toLocaleString('fr-FR', { weekday: 'short'}) : "-"
                    }
                </Text>
            </LinearGradient>
            <View className='flex-1 flex-col items-center justify-center gap-3'>
                <View className='w-full flex-row items-center justify-between'>
                    <View className='border-r border-gris-8 flex-1 flex-col items-center justify-end'>
                        <Text className='text-xl text-white font-medium'>
                            {
                                pointage.arrive ? new Date(pointage.arrive).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : "-"
                            }
                        </Text>
                        <Text className='text-base text-white font-regular'>Arrivée</Text>
                    </View>
                    <View className='border-r border-gris-8 flex-1 flex-col items-center justify-center'>
                        <Text className='text-xl text-white font-medium'>
                            {
                                pointage.depart ? new Date(pointage.depart).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : "-"
                            }
                        </Text>
                        <Text className='text-base text-white font-regular'>Départ</Text>
                    </View>
                    <View className='flex-1 flex-col items-center justify-center'>
                        <Text className='text-xl text-white font-medium'>
                            {
                                pointage.heuresTravaillees ? decimalToTime(pointage.heuresTravaillees) : "-"
                            }
                        </Text>
                        <Text className='text-base text-white font-regular'>D. totale</Text>
                    </View>
                </View>
                <View className='flex-row gap-1.5 items-center justify-center'>
                    <MapPin color='#005758' size={18} />
                    <Text className='text-base text-white font-regular'>{utilisateur?.site.site}</Text>
                </View>
            </View>
        </View>
    )
}

export default PointageCard