import DatePicker from '@/components/datepicker/datePicker';
import Dropdown from '@/components/dropdown/dropdown';
import FileUpdoald from '@/components/fileUpload/fileUpdoald';
import DEV_API_URL from '@/utils/api';
import { authenticatedRequest } from '@/utils/authUtils';
import { uploadHandler } from '@/utils/uploaderHandler';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface RequestResponse {
    message: string,
    status: number, 
}

const NouveauConge = () => {
    const [dateDepart, setDateDepart] = useState<string>('');
    const [dateRetour, setDateRetour] = useState<string>('');
    const [typeConge, setTypeConge] = useState<string>('');
    const [raison, setRaison] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pieceJointe, setPieceJointe] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const [fileUrl, setFileUrl] = useState<string>("");

    const faireUneDemande = async () => {
        if (!dateDepart || !dateRetour || !typeConge || !raison) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez remplir tous les champs",
            })
            return;
        }

        setIsLoading(true)
        
        try {
            const urlFile = pieceJointe ? await uploadHandler(pieceJointe) : null;
            const data = await authenticatedRequest<RequestResponse>({
                url: `${DEV_API_URL}/conge/faire-une-demande`,
                method: 'POST',
                data: {
                    dateDepart: new Date(dateDepart).toISOString(),
                    dateRetour: new Date(dateRetour).toISOString(),
                    raison,
                    typeConge,
                    pieceJointe: pieceJointe?.name || "",
                    PieceJointeURL: urlFile || "",
                }
            })

            if (data?.status === 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Demande',
                    text2: data.message,
                })
            }            
        } catch (error) {
            console.log("une erreur est survenue:", error)
        } finally {setIsLoading(false)}        
        
    }
    

    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="pb-4 pt-28 w-full h-full gap-4 flex-1 items-center justify-center"
        >
            <ScrollView 
                contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 40}} className='w-full flex-1 rounded-xl' 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
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
            <TouchableOpacity
                onPress={faireUneDemande}
                disabled={isLoading}
                activeOpacity={0.8} 
                className='mb-4  px-4 py-5 w-[93%] rounded-full bg-turquoise-8/70 items-center justify-center'
            >
                {
                    isLoading ?
                        <ActivityIndicator size={24} color="#EEEEF0" /> : <Text className='text-xl text-gris-12 font-medium'>Soumettre la demande</Text>
                }                  
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default NouveauConge