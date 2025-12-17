import { router } from 'expo-router'
import React from 'react'
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native'

const NouveauMotDePasse = () => {
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
                    <TextInput secureTextEntry className='w-full bg-turquoise-5/50 px-4 py-4 rounded-2xl text-xl text-gris-12' placeholderTextColor={"#5F606A"} placeholder='Mot de passe' />
                </View>
                <TouchableOpacity onPress={() => router.push("/(tabs)/accueil")} activeOpacity={0.6} className='bg-turquoise-8 w-full py-4 px-8 rounded-2xl items-center justify-center'>
                    <Text className='text-gris-12 text-xl font-semibold'>Changer</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default NouveauMotDePasse