import CongeCard from '@/components/cards/congeCard'
import RenderFooter from '@/components/footer/renderFooter'
import Loading from '@/components/loading/loading'
import { useAuth } from '@/hooks/auth/useAuth'
import { useFetchListConges } from '@/hooks/conge/useFetchConge'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, ImageBackground, RefreshControl, Text, TouchableOpacity, View } from 'react-native'

const CongeListe = () => {
    const { utilisateur } = useAuth()
    const { conges, isLoading, isFetchingNextPage, handleLoadMore, refetch } = useFetchListConges()

    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 pb-4 pt-28 flex-1 w-full h-full gap-6"
        >
            <View className="w-full flex-row items-center justify-between gap-4">
                <View className="bg-turquoise-5/30 rounded-xl p-4 flex-1 flex-col items-center justify-center gap-1">
                    <Text className='text-gris-12 text-xl font-semibold'>{utilisateur?.nombreConge} jours</Text>
                    <Text className='text-gris-12 text-base font-regular'>restants</Text>
                </View>
                <View className="bg-turquoise-5/30 rounded-xl p-4 flex-1 flex-col items-center justify-center gap-1">
                    <Text className='text-gris-12 text-xl font-semibold'>{utilisateur?.nombreConge! - utilisateur?.soldeConge!} jours</Text>
                    <Text className='text-gris-12 text-base font-regular'>utilisés</Text>
                </View>
            </View>
            <View className='w-full flex-row items-center justify-between'>
                <Text className='text-gris-12 text-xl font-medium'>Historique des congés</Text>
            </View>
            <View className='w-full flex-col gap-4 items-center'>
                {
                    isLoading ?
                        <Loading />
                        :
                            conges.length === 0 ?
                                <Text className='text-xl text-gris-12 font-medium'>Aucun congé trouvé</Text>
                                :
                                <FlatList 
                                    horizontal={false}
                                    data={conges}                    
                                    renderItem={({item}) => <CongeCard conge={item} />}
                                    keyExtractor={(item) => item.id.toString()}
                                    className='w-full'
                                    contentContainerStyle={{paddingBottom: 88}}
                                    ListFooterComponent={<RenderFooter isFetchingNextPage={isFetchingNextPage} />}
                                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                                    onEndReached={handleLoadMore}
                                    showsVerticalScrollIndicator={false}
                                    initialNumToRender={10}
                                    maxToRenderPerBatch={10}
                                    removeClippedSubviews={true}
                                    updateCellsBatchingPeriod={50}  
                                    refreshControl={
                                        <RefreshControl 
                                            refreshing={isLoading} 
                                            onRefresh={refetch} 
                                        />
                                    }
                                />
                }
            </View>
            <TouchableOpacity onPress={() => router.push("/(conge)/nouveau-conge")} activeOpacity={0.8} className='absolute bottom-10 left-4 px-4 py-5 w-full rounded-full bg-turquoise-8/70 items-center justify-center'>
                <Text className='text-xl text-gris-12 font-medium'>Nouvelle demande</Text>    
            </TouchableOpacity>               
        </ImageBackground>
    )
}

export default CongeListe