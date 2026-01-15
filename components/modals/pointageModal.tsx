import DEV_API_URL from '@/utils/api'
import { authenticatedRequest } from '@/utils/authUtils'
import { X } from 'lucide-react-native'
import React, { useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import LoginIcon from '../svg/loginIcon'
import LogoutIcon from '../svg/logoutIcon'

interface PointageModalProps {
    arrive: boolean
    depart: boolean
    terminer: boolean
    visible: boolean
    latitude: number | null
    longitude: number | null
    onClose: () => void
    reftech: () => void
}

interface RequestResponse {
    message: string,
    status: number, 
}

const PointageModal = ({ arrive, depart, terminer, visible, latitude, longitude, onClose, reftech }: PointageModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleArrive = async () => {
        const data = await authenticatedRequest<RequestResponse>({
            url: `${DEV_API_URL}/pointage/arrive`,
            method: 'POST',
            params: {
                latitude,
                longitude
            }
        })

        if (data?.status === 200) {
            Toast.show({
                type: 'success',
                text1: 'Pointage',
                text2: data.message,
            })
            reftech()
            onClose()
        }
    }

    const handleDepart = async () => {
        const data = await authenticatedRequest<RequestResponse>({
            url: `${DEV_API_URL}/pointage/depart`,
            method: 'PATCH',
            params: {
                latitude,
                longitude
            }
        })

        if (data?.status === 200) {
            Toast.show({
                type: 'success',
                text1: 'Pointage',
                text2: data.message,
            })
            reftech()
            onClose()
        }
    }

    const handleClick = async () => { 
        if (terminer) {
            Toast.show({
                type: 'info',
                text1: 'Pointage',
                text2: "Vous avez terminé votre journée",
            })
            return
        }    
        
        setIsLoading(true)

        try {
            if (arrive) {
                await handleArrive()
                return
            }

            if (depart) {
                await handleDepart()
                return
            }

            
        } catch (error) {
            console.log("Erreur lors du pointage:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}            
        >
            <View className='px-4 pb-6 bg-gris-2/50 flex-1 items-center justify-end'>
                <View className='bg-gris-12 px-6 pb-6 pt-20 w-full rounded-[48px] flex-col items-center justify-center gap-7'>
                    <TouchableOpacity onPress={onClose} activeOpacity={0.8} className='absolute top-6 right-6 size-8 rounded-full bg-rouge/30 items-center justify-center'>
                        <X strokeWidth={1.5} size={20} color={"#FF1474"} />
                    </TouchableOpacity>
                    <View className='flex-col gap-4 items-center justify-center'>
                        <View className='size-[60px] rounded-full bg-turquoise-8/30 items-center justify-center'>
                            {
                                arrive ? <LogoutIcon color='#008384' size={24} /> : <LoginIcon color='#008384' size={24} />
                            }                         
                        </View>
                        <View className='flex-col gap-1 items-center justify-center'>
                            <Text className='text-gris-1 text-2xl font-medium'>Pointage {arrive ? "arrivée" : "départ"}</Text>
                            <Text className='text-gris-8 text-xl font-medium'>Êtes vous sûr de vouloir {arrive ? "pointer" : "partir"} ?</Text>
                        </View>                        
                    </View> 
                    <View className='w-full flex-col items-center justify-center gap-4'>
                        <TouchableOpacity
                            onPress={handleClick}
                            disabled={isLoading} 
                            activeOpacity={0.8} 
                            className='py-4 rounded-3xl w-full bg-turquoise-8 items-center justify-center'
                        >
                            <Text className='text-gris-12 text-xl font-medium'>Oui</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} activeOpacity={0.8} className='py-4 rounded-3xl w-full bg-gris-11/70 items-center justify-center'>
                            <Text className='text-gris-12 text-xl font-medium'>Non</Text>
                        </TouchableOpacity>
                    </View>                   
                </View>
            </View>
        </Modal>
    )
}

export default PointageModal