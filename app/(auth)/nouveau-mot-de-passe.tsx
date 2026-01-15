import DEV_API_URL from '@/utils/api'
import { authenticatedRequest } from '@/utils/authUtils'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

interface RequestResponse {
    message: string,
    status: number, 
}

const NouveauMotDePasse = () => {
    const [nouveau, setNouveau] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleNouveau = async () => {
        if(nouveau.length === 0 || nouveau.length < 8) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: "Veuillez entrer un mot de passe long",
            })
            return
        }

        setIsLoading(true)

        try {
            const data = await authenticatedRequest<RequestResponse>({
                url: `${DEV_API_URL}/compte/modifier-son-mot-de-passe`,
                method: 'PATCH',
                data: {
                    ancien: "",
                    nouveau
                }
            })

            if (data?.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Modification',
                    text2: data.message,
                })

                router.replace("/(tabs)")
            }
            
        } catch (error) {
            console.log("une erreur est survenue:", error)
        } finally { setIsLoading(false) }
    }

    return (
        <ImageBackground
            source={require("../../assets/images/connexion-background.jpg")}
            resizeMode="cover"
            className="px-4 pb-4 pt-20 flex-1 items-center justify-start bg-turquoise-4"
        >
            <View className='w-full flex-col items-start justify-center gap-8'>
                <View className='w-full flex-col items-start justify-center gap-2'>
                    <Text className='text-4xl text-gris-12 font-bold'>Réinitialisation de mot de passe</Text>
                    <Text className='text-base text-gris-11 font-medium'>C’est votre première connexion. Choisissez un nouveau mot de passe pour protéger votre compte.</Text>
                </View>
                <View className='w-full flex-col items-start justify-center gap-2'>
                    <Text className='text-base text-gris-12 font-medium'>Nouveau mot de passe</Text>
                    <TextInput value={nouveau} onChangeText={setNouveau} secureTextEntry className='w-full bg-turquoise-5/50 px-4 py-4 rounded-2xl text-xl text-gris-12' placeholderTextColor={"#5F606A"} placeholder='Mot de passe' />
                </View>
                <TouchableOpacity 
                    onPress={handleNouveau} 
                    disabled={isLoading}
                    activeOpacity={0.6} 
                    className='bg-turquoise-8 w-full py-4 px-8 rounded-2xl items-center justify-center'
                >
                    {
                        isLoading ? 
                            <ActivityIndicator size={24} color="#EEEEF0" /> : <Text className='text-gris-12 text-xl font-semibold'>Changer</Text>
                    }                    
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default NouveauMotDePasse