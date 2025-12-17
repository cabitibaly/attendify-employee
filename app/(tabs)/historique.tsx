import React from 'react'
import { ImageBackground } from 'react-native'

const Historique = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/main-background.jpg")}
            resizeMode="cover"
            className="px-4 pb-4 pt-16 flex-1 items-center justify-start bg-turquoise-4"
        >

        </ImageBackground>
    )
}

export default Historique