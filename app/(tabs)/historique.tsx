import PointageCard from '@/components/cards/pointageCard';
import CustomCalendar from '@/components/datepicker/customCalendar';
import RenderFooter from '@/components/footer/renderFooter';
import Loading from '@/components/loading/loading';
import { useFetchPointage } from '@/hooks/pointage/useFetchPointage';
import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

const Historique = () => {
    const [selected, setSelected] = useState<string>(new Date().toISOString().split('T')[0]); 
    const { pointages, isFetchingNextPage, isLoading, refetch }  = useFetchPointage(selected == "", new Date(selected).toISOString());    

    return (
        <View className="px-4 py-4 pt-24 flex-1 gap-4 items-center" >
            <CustomCalendar selectedDate={selected} setSelectedDate={setSelected} />
            {
                isLoading ?
                    <Loading />   
                    :   
                        pointages.length === 0 ?
                            <Text className='text-xl text-gris-12 font-medium'>Aucun pointage trouvé</Text>
                            :
                            <FlatList 
                                horizontal={false}
                                data={pointages}                    
                                renderItem={({item}) => <PointageCard pointage={item} />}
                                keyExtractor={(item) => item.id.toString()}
                                className='w-full'
                                contentContainerStyle={{paddingBottom: 88}}
                                ListFooterComponent={<RenderFooter isFetchingNextPage={isFetchingNextPage} />}
                                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
    )
}

export default Historique