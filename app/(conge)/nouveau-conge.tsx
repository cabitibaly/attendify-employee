import DatePicker from '@/components/datepicker/datePicker';
import Dropdown from '@/components/dropdown/dropdown';
import FileUpdoald from '@/components/fileUpload/fileUpdoald';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const NouveauConge = () => {
    const [dateDepart, setDateDepart] = useState<string>('');
    const [dateRetour, setDateRetour] = useState<string>('');
    const [typeConge, setTypeConge] = useState<string>('');
    const [raison, setRaison] = useState<string>('');
    const [pieceJointe, setPieceJointe] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    return (
         <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="pb-4 pt-28 w-full h-full gap-4 flex-1 items-center justify-center"
        >
            <ScrollView contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 40}} className='w-full flex-1 rounded-xl' showsVerticalScrollIndicator={false}>
                <View className='mb-6 w-full flex-col items-start justify-start gap-2'>
                    <Text className='text-xl text-gris-11 font-medium'>Date de départ</Text>
                    <DatePicker setSelectedDate={setDateDepart} selectedDate={dateDepart} />
                </View>
                <View className='mb-6 w-full flex-col items-start justify-start gap-2'>
                    <Text className='text-xl text-gris-11 font-medium'>Date de retour</Text>
                    <DatePicker setSelectedDate={setDateRetour} selectedDate={dateRetour} />
                </View>
                <View className='mb-6 w-full flex-col items-start justify-start gap-2'>
                    <Text className='text-xl text-gris-11 font-medium'>Type de congé</Text>
                    <Dropdown setType={setTypeConge} type={typeConge} />
                </View>
                <View className='mb-6 w-full flex-col items-start justify-start gap-2'>
                    <Text className='text-xl text-gris-11 font-medium'>Raison</Text>
                    <TextInput
                        value={raison}
                        onChangeText={setRaison}
                        multiline
                        numberOfLines={6}
                        placeholder="Saisir la raison..."
                        className="p-3 rounded-xl bg-turquoise-5/50 w-full h-40 text-xl text-gris-12 font-medium"
                        style={{ textAlignVertical: 'top' }}
                        placeholderTextColor={"#5F606A"}
                    />
                </View>
                <View className='w-full flex-col items-start justify-start gap-2'>
                    <Text className='text-xl text-gris-11 font-medium'>Piece jointe (optionnel)</Text>
                    <FileUpdoald file={pieceJointe} setFile={setPieceJointe} />
                </View>
            </ScrollView>
            <TouchableOpacity activeOpacity={0.8} className='mb-4  px-4 py-5 w-[93%] rounded-full bg-turquoise-8/70 items-center justify-center'>
                <Text className='text-xl text-gris-12 font-medium'>Soumettre la demande</Text>    
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default NouveauConge