import HandPointerIcon from '@/components/svg/handPointing';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

const Accueil = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 py-4 flex-1 items-center justify-center"
        >
            <View className='w-full absolute top-16 flex-row items-center justify-between'>
                <View className='flex-col items-start justify-start'>
                    <Text className='text-3xl text-gris-12 font-medium'>Bonjour,</Text>
                    <Text className='text-3xl text-gris-12 font-bold'>Santa Dear</Text>
                </View>
                <View className='overflow-hidden size-20 rounded-full'>
                    <Image className='size-full' source={require("../../assets/images/Dear-Santa.jpeg")} />
                </View>
            </View>
            <View className='w-full flex-col items-center justify-center'>
                <View style={styles.shadowWrapper}>
                    <LinearGradient
                        colors={['#003B3C', '#006A6B']}
                        style={styles.gradient}                    
                    >
                        <HandPointerIcon size={96} />
                        <Text className='text-3xl text-white font-medium'>Arrivée</Text>
                    </LinearGradient>
                </View>
            </View>
        </ImageBackground>
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