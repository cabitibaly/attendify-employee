import { router, Stack } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import React from 'react'
import { ImageBackground, Pressable } from 'react-native'

const Congelayout = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="flex-1  w-full h-full"
        >
            <Stack
                screenOptions={{                    
                    headerShown: true,
                    headerStyle: { backgroundColor: 'transparent' },
                    headerTransparent: true,
                    headerTitleStyle: { 
                        color: '#EEEEF0', 
                        fontSize: 28, 
                        fontWeight: "semibold" 
                    },
                    headerTitleAlign: "center",
                    headerBackVisible: false,                        
                    headerLeft: () => (
                        <Pressable onPress={() => router.back()} className="size-10 z-50 rounded-full bg-turquoise-9/30 items-center justify-center">
                            <ChevronLeft strokeWidth={1.75} size={28} color='#30CFD0' />
                        </Pressable>
                    )
                }}
            >
                <Stack.Screen 
                    name="index"
                    options={{title: "Congés"}}                 
                />
                <Stack.Screen 
                    name="nouveau-conge"
                    options={{title: "Nouveau congé"}}                 
                />
            </Stack>
        </ImageBackground>
    )
}

export default Congelayout