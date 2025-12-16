import React from 'react'
import { ImageBackground } from 'react-native'

const Index = () => {   

    return (
        <ImageBackground
            source={require("../../assets/images/connexion-background.jpg")}
            resizeMode="cover"
            className="flex-1 items-center justify-center bg-turquoise-4"
        >
                        
        </ImageBackground>
    )
}

export default Index