import CustomBottomSheet, { CustomBottomSheetRef } from '@/components/custom-bottom-sheet/customBottomSheet';
import PointageModal from '@/components/modals/pointageModal';
import LocationPermission from '@/components/permission/location-permission';
import NotificationPermission from '@/components/permission/notification-permission';
import HandPointerIcon from '@/components/svg/handPointing';
import LoginIcon from '@/components/svg/loginIcon';
import LogoutIcon from '@/components/svg/logoutIcon';
import MapPin from '@/components/svg/mapPin';
import { useAuth } from '@/hooks/auth/useAuth';
import { usePushNotification } from '@/hooks/notification-push/usePushNotification';
import { useFetchMaPosition, useFetchPointage } from '@/hooks/pointage/useFetchPointage';
import decimalToTime from '@/utils/decimalToTime';
import { checkLocationPermission } from '@/utils/location';
import { checkNotificationPermisison } from '@/utils/notification';
import { hasPermissionBeenAsked } from '@/utils/storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Accueil = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [locationGranted, setLocationGranted] = useState<boolean>(false);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const notifBottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const locationBottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const { pointages, refetch } = useFetchPointage(true)
    const { utilisateur } = useAuth()    
    const { data } = useFetchMaPosition(latitude, longitude)
    const { expoPushToken, enregistrerPushToken } = usePushNotification();

    useEffect(() => {        
        (async () => {
                        
            const notifAsked = await hasPermissionBeenAsked('NOTIFICATION_PERMISSION_kEY');
            const notifGranted = await checkNotificationPermisison();                            

            if (!notifAsked && !notifGranted) {
                setTimeout(() => notifBottomSheetRef.current?.open(), 500);                
            }

            const locationAsked = await hasPermissionBeenAsked('LOCATION_PERMISSION_kEY');
            const locationGranted = await checkLocationPermission();
            setLocationGranted(locationGranted);

            if (!locationAsked && !locationGranted) {
                setTimeout(() => locationBottomSheetRef.current?.open(), 500);
            }

        })();
              
    }, []);

    useEffect(() => {
        let subscription: Location.LocationSubscription

        (async () => {
            const locationGranted = await checkLocationPermission();
            if (!locationGranted) return;

            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 30_000,
                    distanceInterval: 0,
                },
                (location) => {
                    setLatitude(location.coords.latitude)
                    setLongitude(location.coords.longitude)                    
                }
            )
        })()

        return () => {
            subscription?.remove()
        }        

    }, [locationGranted])

    useEffect(() => {

        if (expoPushToken) {
            enregistrerPushToken(expoPushToken);
        }        

    }, [expoPushToken])    

    return (
        <View className="px-4 py-4 flex-1 items-center justify-center" >
            <View className='w-full absolute top-16 flex-row items-center justify-between'>
                <View className='flex-col items-start justify-start'>
                    <Text className='text-3xl text-gris-12 font-medium'>Bonjour,</Text>
                    <Text className='text-3xl text-gris-12 font-bold'>{utilisateur?.prenom} {utilisateur?.nom}</Text>
                </View>
                <View className='overflow-hidden size-20 rounded-full items-center justify-center bg-turquoise-8'>
                    {
                        utilisateur?.image ?
                            <Image className='size-full' source={{uri: utilisateur.image}} />
                            : 
                            <Text className='text-3xl text-gris-12 font-bold'>{utilisateur?.nom.charAt(0)}</Text>
                    }                    
                </View>
            </View>
            <View className='w-full flex-col items-center justify-center gap-6'>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} activeOpacity={0.8} style={styles.shadowWrapper}>
                    <LinearGradient
                        colors={['#003B3C', '#006A6B']}
                        style={styles.gradient}                    
                    >
                        <HandPointerIcon size={96} />
                        <Text className='text-3xl text-white font-medium'>
                            {
                                pointages.length === 0 ? "Arrivée" : pointages[0]?.depart == null ? "Départ" : "Terminer"
                            }
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View className='flex-row gap-1.5 items-center justify-center'>
                    <MapPin  />
                    <Text className='text-base text-white font-regular'>Vous { data?.est_sur_site ? "êtes sur site" : "n'êtes pas sur site" }</Text>
                </View>
                <View className='w-full flex-row items-center justify-center gap-4'>
                    <View className='bg-turquoise-5/30 p-3 rounded-xl flex-1 flex-col items-center justify-center gap-2'>
                        <View className='w-full flex-row items-center justify-between'>
                            <Text className='text-base text-white font-regular'>Arrivée</Text>
                            <LogoutIcon color='#30CFD0' size={20} />
                        </View>
                        <Text className='text-xl text-white font-medium'>
                            {
                                pointages.length == 1 && pointages[0].arrive ? new Date(pointages[0].arrive).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : "-"
                            }
                        </Text>
                    </View>
                    <View className='bg-turquoise-5/30 p-3 rounded-xl flex-1 flex-col items-center justify-center gap-2'>
                        <View className='w-full flex-row items-center justify-between'>
                            <Text className='text-base text-white font-regular'>Départ</Text>
                            <LoginIcon color='#30CFD0' size={20} />
                        </View>
                        <Text className='text-xl text-white font-medium'>
                            {
                                pointages.length == 1 && pointages[0].depart ? new Date(pointages[0].depart).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : "-"
                            }
                        </Text>
                    </View>
                    <View className='bg-turquoise-5/30 p-[10px] rounded-xl flex-1 flex-col items-center justify-center gap-2'>
                        <Text className='text-base text-center text-white font-regular'>Durée totale</Text>
                        <Text className='text-xl text-white font-medium'>
                            {
                                pointages.length == 1 && pointages[0].heuresTravaillees ? decimalToTime(pointages[0].heuresTravaillees) : "-"
                            }
                        </Text>
                    </View>
                </View>
            </View>
            <PointageModal
                visible={modalVisible} 
                latitude={latitude}
                longitude={longitude}
                pointage={pointages[0] || null}
                onClose={() => setModalVisible(false)} 
                reftech={refetch}
            />
            <CustomBottomSheet 
                ref={notifBottomSheetRef}
                onClose={() => console.log('Fermé')}
                snapPoints={["47%"]}
            >   
                <NotificationPermission 
                    onClose={ () => {notifBottomSheetRef.current?.close()}}
                />
            </CustomBottomSheet>
            <CustomBottomSheet 
                ref={locationBottomSheetRef}
                onClose={() => console.log('Fermé')}
                snapPoints={["47%"]}
            >   
                <LocationPermission 
                    onClose={ () => {locationBottomSheetRef.current?.close()}}
                    setLocationGranted={setLocationGranted}
                />
            </CustomBottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    shadowWrapper: {        
        shadowColor: '#30CFD0',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.35,
        shadowRadius: 30,
        elevation: 30,
        borderRadius: 1000,        
        backgroundColor: 'transparent',
    },
    gradient: {
        width: 220,
        height: 220,
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    }
})

export default Accueil