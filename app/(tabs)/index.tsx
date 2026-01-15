import PointageModal from '@/components/modals/pointageModal';
import HandPointerIcon from '@/components/svg/handPointing';
import LoginIcon from '@/components/svg/loginIcon';
import LogoutIcon from '@/components/svg/logoutIcon';
import MapPin from '@/components/svg/mapPin';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Accueil = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    return (
        <View className="px-4 py-4 flex-1 items-center justify-center" >
            <View className='w-full absolute top-16 flex-row items-center justify-between'>
                <View className='flex-col items-start justify-start'>
                    <Text className='text-3xl text-gris-12 font-medium'>Bonjour,</Text>
                    <Text className='text-3xl text-gris-12 font-bold'>Santa Dear</Text>
                </View>
                <View className='overflow-hidden size-20 rounded-full'>
                    <Image className='size-full' source={require("../../assets/images/Dear-Santa.jpeg")} />
                </View>
            </View>
            <View className='w-full flex-col items-center justify-center gap-6'>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} activeOpacity={0.8} style={styles.shadowWrapper}>
                    <LinearGradient
                        colors={['#003B3C', '#006A6B']}
                        style={styles.gradient}                    
                    >
                        <HandPointerIcon size={96} />
                        <Text className='text-3xl text-white font-medium'>Arrivée</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View className='flex-row gap-1.5 items-center justify-center'>
                    <MapPin  />
                    <Text className='text-base text-white font-regular'>Vous êtes dans la zone</Text>
                </View>
                <View className='w-full flex-row items-center justify-center gap-4'>
                    <View className='bg-turquoise-5/30 p-3 rounded-xl flex-1 flex-col items-center justify-center gap-2'>
                        <View className='w-full flex-row items-center justify-between'>
                            <Text className='text-base text-white font-regular'>Arrivée</Text>
                            <LogoutIcon color='#30CFD0' size={20} />
                        </View>
                        <Text className='text-xl text-white font-medium'>08:00</Text>
                    </View>
                    <View className='bg-turquoise-5/30 p-3 rounded-xl flex-1 flex-col items-center justify-center gap-2'>
                        <View className='w-full flex-row items-center justify-between'>
                            <Text className='text-base text-white font-regular'>Départ</Text>
                            <LoginIcon color='#30CFD0' size={20} />
                        </View>
                        <Text className='text-xl text-white font-medium'>16:00</Text>
                    </View>
                    <View className='bg-turquoise-5/30 p-[10px] rounded-xl flex-1 flex-col items-center justify-center gap-2'>
                        <Text className='text-base text-center text-white font-regular'>Durée totale</Text>
                        <Text className='text-xl text-white font-medium'>08:00</Text>
                    </View>
                </View>
            </View>
            <PointageModal 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    shadowWrapper: {        
        shadowColor: '#30CFD0',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.35,
        shadowRadius: 30,
        elevation: 30,
        borderRadius: 1000,        
        backgroundColor: 'transparent',
    },
    gradient: {
        width: 220,
        height: 220,
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    }
})

export default Accueil