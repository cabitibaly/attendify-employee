import PointageCard from '@/components/cards/pointageCard';
import CustomCalendar from '@/components/datepicker/customCalendar';
import React, { useState } from 'react';
import { View } from 'react-native';

const Historique = () => {
    const [selected, setSelected] = useState<string>(''); 

    return (
        <View className="px-4 py-4 pt-28 flex-1 gap-4" >
            <CustomCalendar selectedDate={selected} setSelectedDate={setSelected} />
            <PointageCard />
            <PointageCard />
        </View>
    )
}

export default Historique