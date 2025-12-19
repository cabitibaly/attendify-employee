import DatePicker from '@/components/datepicker/datePicker';
import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';

const NouveauConge = () => {
    const [dateDepart, setDateDepart] = useState<string>('');
    const [dateRetour, setDateRetour] = useState<string>('');

    return (
         <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 pb-4 pt-28 flex-1 w-full h-full gap-6"
        >
            <View className='w-full flex-col items-start justify-start gap-2'>
                <Text className='text-xl text-gris-11 font-medium'>Date de départ</Text>
                <DatePicker setSelectedDate={setDateDepart} selectedDate={dateDepart} />
            </View>
            <View className='w-full flex-col items-start justify-start gap-2'>
                <Text className='text-xl text-gris-11 font-medium'>Date de retour</Text>
                <DatePicker setSelectedDate={setDateRetour} selectedDate={dateRetour} />
            </View>
        </ImageBackground>
    )
}

export default NouveauConge