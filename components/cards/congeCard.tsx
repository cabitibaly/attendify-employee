import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ChevronRightSquare from '../svg/ChevronRightSquare'

interface CongeCardProps {
    status: string
}

const CongeCard = ({ status }: CongeCardProps) => {

    const statusColor = () => {
        switch (status) {
            case 'En attente':
                return '#FFDC10'
            case 'Approuvé':
                return '#00E074'
            case 'Rejeté':
                return '#FF1474'
            default:
                return '#FFDC10'
        }
    }

    const statusBg = (): string => {
        switch (status) {
            case 'En attente':
                return 'rgba(255, 220, 16, 0.4)'
            case 'Approuvé':
                return 'rgba(0, 224, 116, 0.4)'
            case 'Rejeté':
                return 'rgba(255, 20, 116, 0.4)'
            default:
                return 'rgba(255, 220, 16, 0.4)'
        }
    }

    return (
        <TouchableOpacity onPress={() => router.push("/(conge)/2")} activeOpacity={0.9} className='p-4 w-full bg-turquoise-5/30 rounded-xl flex-row items-center justify-between'>
            <View className='flex-col items-start justify-start gap-2'>
                <Text className='text-gris-8 text-xl font-semibold'>Date</Text>
                <Text className='text-gris-12 text-2xl font-semibold'>23 Déc. - 26 Déc.</Text>
                <Text className='text-turquoise-9 text-xl font-semibold'>Congé exceptionnel</Text>
            </View>
            <View className='flex-col items-end justify-start gap-11 '>
                <View style={{backgroundColor: statusBg(), borderRadius: 8}} className='p-2 items-center justify-center'>
                    <Text style={{color: statusColor()}} className='text-xs font-semibold'>{status}</Text>
                </View>                
                <ChevronRightSquare size={24} color='#30CFD0' />                
            </View>
        </TouchableOpacity>
    )
}

export default CongeCard