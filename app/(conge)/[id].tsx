import CalendarIcon2 from '@/components/svg/calendarIcon2';
import PDFIcon from '@/components/svg/pdfIcon';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

const CongeDetail = () => {
    const { id } = useLocalSearchParams();
    console.log(id)

    return (
         <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 pb-4 pt-28 flex-1 w-full h-full gap-8"
        >
            <Stack.Screen options={{title: "Détails du congé", headerTitleAlign: "center"}} />
            <View className='w-full flex-col items-start justify-start gap-2'>
                <Text className='text-xl text-gris-11 font-medium'>Durée</Text>
                <View className='w-full flex-row items-center justify-between gap-2'>
                    <View className='p-3 rounded-xl bg-turquoise-5/50 w-[45%] flex-row items-center justify-center gap-3'>
                        <CalendarIcon2 size={28} color='#008384' />
                        <Text className='text-xl text-gris-12 font-medium'>{new Date().toLocaleDateString('fr-FR')}</Text>
                    </View>
                    <Text className='text-xl text-gris-12 font-medium'>Au</Text>
                    <View className='p-3 rounded-xl bg-turquoise-5/50 w-[45%] flex-row items-center justify-center gap-3'>
                        <CalendarIcon2 size={28} color='#008384' />
                        <Text className='text-xl text-gris-12 font-medium'>{new Date().toLocaleDateString('fr-FR')}</Text>
                    </View>
                </View>
            </View>
            <View className='w-full flex-col items-start justify-start gap-2'>
                <Text className='text-xl text-gris-11 font-medium'>Type de congé</Text>
                <View className='p-3 rounded-xl bg-turquoise-5/50 w-full flex-row items-center justify-start'>
                    <Text className='text-xl text-gris-12 font-medium'>Congé exceptionnel</Text>
                </View>
            </View>
            <View className='w-full flex-col items-start justify-start gap-2'>
                <Text className='text-xl text-gris-11 font-medium'>Raison</Text>
                <View className='p-3 rounded-xl bg-turquoise-5/50 w-full flex-row items-center justify-start'>
                    <Text className='text-xl text-gris-12 font-medium'>
                        MyID is an HR management platform that helps employees manage daily attendance with ease.
                    </Text>
                </View>
            </View>
            <View className='w-full flex-col items-start justify-start gap-2'>
                <Text className='text-xl text-gris-11 font-medium'>Pièce jointe</Text>
                <View className='p-3 rounded-xl bg-turquoise-5/50 w-full flex-row items-center justify-start gap-2'>
                    <PDFIcon />
                    <View className='flex-col items-start justify-start gap-0'>
                        <Text className='text-base text-gris-12 font-regukar line-clamp-1'>Attestation_de_présence.pdf</Text>
                        <Text className='text-base text-gris-8 font-medium'>1.1 MB</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default CongeDetail