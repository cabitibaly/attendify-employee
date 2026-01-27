import Loading from '@/components/loading/loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { Dot } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const ConditionGenerale = () => { 
    const [finScroll, setFinScroll] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [accepterCondidions, setAccepterConditions] = useState<boolean>(false);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        
        const endScroll = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        setFinScroll(endScroll);
    }

    const accepterLesConditions = async () => {
        try {
            await AsyncStorage.setItem("@accepterLesConditions", "true");  
            setAccepterConditions(true) 
            router.replace("/(auth)")
        } catch (error) {
            console.log("Error @accepterLesConditions ", error);
        }
    }

    const checkAccepterConditions = async () => {
        try {
            const value = await AsyncStorage.getItem("@accepterLesConditions");
            if(value !== null) {
                setAccepterConditions(true);
            }
        } catch (error) {
            console.log("Error @checkAccepterConditions ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {       
        checkAccepterConditions();
    }, [])

    useEffect(() => {       

        if(!loading && accepterCondidions) {
            router.replace("/(auth)")      
        }

    }, [accepterCondidions, loading])

    return (
        <View className='flex-1'>
            {   loading ? 
                    <Loading /> 
                :
                    <>
                        <View className="pt-10 flex-1">
                            <View className='p-4'>
                                <Text style={{fontSize: 24}} className='text-gris-12 font-medium'>
                                    Politique de confidentialité
                                </Text>
                            </View>
                            <ScrollView 
                                showsVerticalScrollIndicator={false} 
                                onScroll={handleScroll}
                                scrollEventThrottle={16}
                                className='rounded-[28px]' 
                                contentContainerStyle={{ 
                                    paddingBottom: 16, 
                                    paddingHorizontal: 16 
                                }}
                            >                    
                                <Text className='text-gris-11 text-xl font-regular'>
                                    Dernière mise à jour: le 16 décembre 2025
                                </Text>
                                <View className="mt-6 flex-col w-full gap-4">                        
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        1. Objet des présentes conditions
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                        Les présentes Conditions Générales d’Utilisation (CGU) ont pour objectif d’encadrer l’accès 
                                        et l’utilisation de l’application mobile Attendify, développée et éditée par Santa Dear. 
                                        En utilisant l’application, l’utilisateur accepte pleinement et sans réserve les présentes 
                                        conditions.
                                    </Text>                        
                                </View>
                                <View className="mt-6 flex-col w-full gap-4">                        
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        2. Description du service
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                    Attendify est une application permettant le suivi et le pointage de présence des utilisateurs. 
                                    L’application permet d’enregistrer les heures d’entrée et de sortie, ainsi que de suivre l’historique 
                                    d’activité associé à un compte utilisateur.
                                    </Text>                        
                                </View>
                                <View className="mt-6 flex-col w-full gap-4">                        
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        3. Création et utilisation d’un compte
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                    L&apos;accès au service peut nécessiter la création d&apos;un compte utilisateur. L&apos;utilisateur 
                                    s&apos;engage à fournir des informations exactes lors de l’inscription et à ne pas usurper 
                                    l&apos;identité d’un tiers. L&apos;utilisateur est seul responsable des actions réalisées via son compte.
                                    </Text>                        
                                </View>
                                <View className="mt-6 flex-col w-full gap-4">
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        4. Données collectées
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                    L’application collecte les données personnelles suivantes :
                                    </Text> 
                                    <View className="flex-col">                       
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='text-left text-gris-12 text-base font-regurlar'>Nom</Text>
                                        </View>                        
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='text-left text-gris-12 text-base font-regurlar'>Prénom</Text>
                                        </View>                        
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='text-left text-gris-12 text-base font-regurlar'>Email</Text>
                                        </View>                        
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='text-left text-gris-12 text-base font-regurlar'>Téléphone</Text>
                                        </View>                        
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='text-left text-gris-12 text-base font-regurlar'>Géolocalisation</Text>
                                        </View>                        
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='text-left text-gris-12 text-base font-regurlar'>Photo ou image de l&apos;utilisateur</Text>
                                        </View>
                                    </View>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                    Ces informations sont nécessaires au fonctionnement du service, notamment pour identifier 
                                    l’utilisateur et enregistrer ses présences.
                                    </Text>
                                </View>
                                <View className="mt-6 flex-col w-full gap-4">                        
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        5. Stockage et conservation des données
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                    Les données collectées sont stockées sur un serveur VPS sécurisé administré par l’éditeur. 
                                    Aucune donnée n’est transmise à des tiers sans l’accord de l’utilisateur, sauf obligation légale.
                                    </Text>                        
                                </View>
                                <View className="mt-6 flex-col w-full gap-4">                        
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        6. Politique de confidentialité et protection des données
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                        Attendify s’engage à protéger les données personnelles de ses utilisateurs. 
                                        Les informations collectées ne sont utilisées que dans le cadre du service et ne font l’objet 
                                        d’aucune revente ou exploitation commerciale extérieure.
                                        L’utilisateur reconnaît toutefois que :
                                    </Text>  
                                    <View className="flex-col gap-2">                       
                                        <View className='items-start justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='flex-1 text-left text-gris-12 text-base font-regurlar'>Ses données sont nécessaires au fonctionnement de l’application.</Text>
                                        </View>                      
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='flex-1 text-left text-gris-12 text-base font-regurlar'>Certaines informations (notamment géolocalisation et image) peuvent être utilisées pour améliorer l’expérience et assurer la fiabilité du pointage.</Text>
                                        </View>                      
                                    </View>                      
                                </View>
                                <View className="mt-6 flex-col w-full gap-4">                        
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        7.  Droits de l’utilisateur
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                        L’utilisateur peut demander :
                                    </Text>  
                                    <View className="flex-col gap-2">                       
                                        <View className='items-start justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='flex-1 text-left text-gris-12 text-base font-regurlar'>la consultation des données enregistrées à son suje</Text>
                                        </View>                      
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='flex-1 text-left text-gris-12 text-base font-regurlar'>la correction en cas d’erreur ou d’information obsolète</Text>
                                        </View>                      
                                    </View>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                        Toute demande peut être adressée à l’éditeur via l’adresse suivante : 📩 dearsanta@jiyuu.com
                                    </Text>                      
                                </View>
                                <View className="mt-6 flex-col w-full gap-4">                        
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        8.  Responsabilités
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                        L’éditeur s’efforce d’assurer le bon fonctionnement de l’application, mais ne peut être tenu responsable en cas de :
                                    </Text>  
                                    <View className="flex-col gap-2">                       
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='flex-1 text-left text-gris-12 text-base font-regurlar'>panne technique</Text>
                                        </View>                      
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='flex-1 text-left text-gris-12 text-base font-regurlar'>perte temporaire d’accès</Text>
                                        </View>                      
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='flex-1 text-left text-gris-12 text-base font-regurlar'>utilisation inappropriée par l’utilisateur</Text>
                                        </View>                      
                                        <View className='items-center justify-start flex-row'>
                                            <Dot color={"#fff"} size={40} />
                                            <Text className='flex-1 text-left text-gris-12 text-base font-regurlar'>données ou informations fournies inexactes par l’utilisateur</Text>
                                        </View>                      
                                    </View>                     
                                </View>
                                <View className="mt-6 flex-col w-full gap-4">                        
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        9.  Modifications des conditions
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                        Santa Dear se réserve le droit de modifier à tout moment les présentes CGU et Politique de Confidentialité. 
                                        En cas de modification, une mise à jour sera affichée dans l’application.
                                    </Text>
                                </View>
                                <View className="mt-6 flex-col w-full gap-4">                        
                                    <Text className='text-gris-12 text-2xl font-medium'>
                                        10.  Acceptation
                                    </Text>
                                    <Text className='text-left text-gris-12 text-base font-regurlar'>
                                        L’utilisation de l’application implique l’acceptation pleine et entière des présentes CGU et Politique de Confidentialité. 
                                        Si l’utilisateur n’accepte pas ces conditions, il est invité à cesser d’utiliser Attendify.
                                    </Text>
                                </View>
                            </ScrollView>
                        </View> 
                        <View className='p-4'>
                            <TouchableOpacity onPress={accepterLesConditions} disabled={!finScroll} activeOpacity={0.6} style={{backgroundColor: `${finScroll ? "#008384" : "#005758"}`}} className='py-4 px-8 rounded-2xl items-center justify-center'>
                                <Text className='text-xl text-gris-12 font-semibold'>
                                    J&apos;accepte
                                </Text>
                            </TouchableOpacity>
                        </View> 
                    </>
            }          
        </View>
    )
}

export default ConditionGenerale