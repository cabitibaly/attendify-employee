import { X } from 'lucide-react-native'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import LogoutIcon from '../svg/logoutIcon'

interface PointageModalProps {
    visible: boolean
    onClose: () => void    
}

const PointageModal = ({ visible, onClose }: PointageModalProps) => {
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
                            <LogoutIcon color='#008384' size={24} />
                        </View>
                        <View className='flex-col gap-1 items-center justify-center'>
                            <Text className='text-gris-1 text-2xl font-medium'>Pointage arrivée</Text>
                            <Text className='text-gris-8 text-xl font-medium'>Êtes vous sûr de vouloir pointer ?</Text>
                        </View>                        
                    </View> 
                    <View className='w-full flex-col items-center justify-center gap-4'>
                        <TouchableOpacity activeOpacity={0.8} className='py-4 rounded-3xl w-full bg-turquoise-8 items-center justify-center'>
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