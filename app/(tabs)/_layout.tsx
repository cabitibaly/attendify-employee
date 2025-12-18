import CustomNavBar from '@/components/tabbar/customTabBar'
import { Tabs } from 'expo-router'
import React from 'react'
import { ImageBackground } from 'react-native'

const TabLayout = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="flex-1  w-full h-full"
        >            
            <Tabs  
                tabBar={(props) => <CustomNavBar {...props} />}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: 'transparent' },
                }}
            >
                <Tabs.Screen 
                    name="accueil" 
                    options={{
                        title: "Accueil",
                        tabBarShowLabel: false,                    
                    }} 
                />
                <Tabs.Screen 
                    name="historique"
                    options={{title: "Historique"}} 
                />
                <Tabs.Screen 
                    name="profile"
                    options={{title: "Profile"}} 
                />
            </Tabs>            
        </ImageBackground>
    )
}

export default TabLayout