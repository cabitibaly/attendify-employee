import { ArrowRight } from "lucide-react-native"
import React, { useEffect, useRef } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import Svg, { Circle, G } from "react-native-svg"

const NextButton = ({percentage, scrollTo}: {percentage: number, scrollTo: () => void}) => {
    const size = 96
    const strokeWidth = 2
    const centerSize = size / 2
    const radius = size / 2 - strokeWidth / 2
    const circumference = 2 * Math.PI * radius

    const progressAnimation = useRef(new Animated.Value(0)).current
    const progressRef = useRef<Circle | null>(null)
    

    useEffect(() => {

        const animation = (toValue: number) => {
            return Animated.timing(progressAnimation, {
                toValue,
                duration: 250,
                useNativeDriver: true,
            }).start()
        }

        animation(percentage)

    }, [percentage, progressAnimation])

    useEffect(() => {
        progressAnimation.addListener(
            (value) => {
                const strokeDashoffset = circumference - (circumference * value.value) / 100

                if (progressRef.current) {
                    progressRef.current.setNativeProps({
                        strokeDashoffset,
                    })
                }
            },            
        )

        return () => {
            progressAnimation.removeAllListeners()
        }
    }, [circumference, progressAnimation])

    return (
        <View className='mb-8 items-center justify-center'>
            <Svg width={size} height={size} className='bg-transparent'>
                <G transform={`rotate(-90 ${centerSize} ${centerSize})`}>
                    <Circle 
                        stroke="#004849"
                        cx={centerSize}
                        cy={centerSize}
                        r={radius}
                        strokeWidth={strokeWidth}                                        
                    />
                    <Circle 
                        ref={progressRef}
                        stroke="#008384"
                        cx={centerSize}
                        cy={centerSize}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                    />
                </G>
            </Svg>            
            <TouchableOpacity onPress={scrollTo} className='absolute bg-' activeOpacity={0.6}>
                <ArrowRight strokeWidth={1.5} size={40} color="#008384" />
            </TouchableOpacity>
        </View>
    )
}

export default NextButton