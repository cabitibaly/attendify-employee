import Loading from '@/components/loading/loading';
import CalendarIcon2 from '@/components/svg/calendarIcon2';
import PDFIcon from '@/components/svg/pdfIcon';
import { useFetchConge } from '@/hooks/conge/useFetchConge';
import { downloadAndGetFileSize, openFile } from '@/utils/dowloadFile';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

const CongeDetail = () => {
    const { id } = useLocalSearchParams();
    const { conge, isLoading, refetch } = useFetchConge(Number(id))
    const [size, setSize] = useState<number | null>(null);
    const [uri, setUri] = useState<string | null>(null);
    const [isLoadingPdf, setIsLoadingPdf] = useState<boolean>(false);

    useEffect(() => {

        (async () => {
            if (conge?.pieceJointe) {
                const result = await downloadAndGetFileSize(conge.pieceJointeURL, setIsLoadingPdf);
                setSize(result?.size!);
                setUri(result?.uri!);
            }
        })()

    }, [conge])    

    return (
         <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 pb-4 pt-28 flex-1 w-full h-full gap-8"
        >
            <Stack.Screen options={{title: "Détails du congé", headerTitleAlign: "center"}} />
                {   
                    isLoading ? 
                        <Loading /> 
                    :
                        <ScrollView 
                            showsVerticalScrollIndicator={false}  
                            contentContainerStyle={{ gap: 32 }}
                            refreshControl={
                                <RefreshControl 
                                    refreshing={isLoading} 
                                    onRefresh={refetch} 
                                />
                            }
                        >
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-medium'>Durée</Text>
                                <View className='w-full flex-row items-center justify-between gap-2'>
                                    <View className='p-3 rounded-xl bg-turquoise-5/50 w-[45%] flex-row items-center justify-center gap-3'>
                                        <CalendarIcon2 size={28} color='#008384' />
                                        <Text className='text-xl text-gris-12 font-medium'>{new Date(conge?.dateDepart || "").toLocaleDateString('fr-FR')}</Text>
                                    </View>
                                    <Text className='text-xl text-gris-12 font-medium'>Au</Text>
                                    <View className='p-3 rounded-xl bg-turquoise-5/50 w-[45%] flex-row items-center justify-center gap-3'>
                                        <CalendarIcon2 size={28} color='#008384' />
                                        <Text className='text-xl text-gris-12 font-medium'>{new Date(conge?.dateRetour || "").toLocaleDateString('fr-FR')}</Text>
                                    </View>
                                </View>
                            </View>
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-medium'>Type de congé</Text>
                                <View className='p-3 rounded-xl bg-turquoise-5/50 w-full flex-row items-center justify-start'>
                                    <Text className='text-xl text-gris-12 font-medium'>{conge?.typeConge || "-"}</Text>
                                </View>
                            </View>
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-medium'>Raison</Text>
                                <View className='p-3 rounded-xl bg-turquoise-5/50 w-full flex-row items-center justify-start'>
                                    <Text className='text-xl text-gris-12 font-medium'>
                                        {conge?.raison || "-"}
                                    </Text>
                                </View>
                            </View>
                            <View className='w-full flex-col items-start justify-start gap-2'>
                                <Text className='text-xl text-gris-11 font-regular'>Pièce jointe</Text>
                                {
                                    conge?.pieceJointe ?                                        
                                        <TouchableOpacity 
                                            onPress={async() => await openFile(uri as string)} 
                                            disabled={isLoading} 
                                            activeOpacity={0.8} 
                                            className='p-3 rounded-xl bg-turquoise-5/50 w-full flex-row items-center justify-start gap-2'
                                        >
                                            {  
                                                isLoadingPdf ? 
                                                    <ActivityIndicator size={24} color="#EEEEF0" />
                                                    :
                                                    <>
                                                        <PDFIcon />
                                                        <View className='flex-col items-start justify-start gap-0'>
                                                            <Text className='text-base text-gris-12 font-regukar line-clamp-1'>{conge?.pieceJointe}</Text>
                                                            <Text className='text-base text-gris-8 font-medium'>{size && `${(size / (1024 * 1024)).toFixed(2)} MB`}</Text>
                                                        </View>
                                                    </>
                                            }
                                        </TouchableOpacity>
                                        :
                                        <Text className='text-xl text-gris-12 font-medium'>{"-"}</Text>                   
                                }
                            </View>
                        </ScrollView>
                }
        </ImageBackground>
    )
}

export default CongeDetail