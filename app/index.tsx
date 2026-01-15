import Loading from "@/components/loading/loading";
import Onboarding from "@/components/onboarding/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import ConditionGenerale from "./condition-generale";

export default function Index() {
    const [loading, setLoading] = useState<boolean>(true);
    const [viewedOnbording, setViewedOnboarding] = useState<boolean>(false);
    const [accepterCondidions, setAccepterConditions] = useState<boolean>(false);

    const checkOnboarding = async () => {
        try {

            const [viewed, accepted] = await Promise.all([
                AsyncStorage.getItem("@viewedOnboarding"),
                AsyncStorage.getItem("@accepterLesConditions"),
            ]);

            if (viewed !== null) {
                setViewedOnboarding(true);
            }

            if (accepted !== null) {
                setAccepterConditions(true);
            }

        } catch (error) {
            console.log("Error @checkOnboarding ", error);
        } finally {
            setLoading(false);
        }    
    }

    useEffect(() => {
        checkOnboarding();
    }, [])

    useEffect(() => {

        if(!loading && viewedOnbording && accepterCondidions) {
            router.replace("/(auth)")      
        }                  

    }, [loading, viewedOnbording, accepterCondidions])

    if (!loading && viewedOnbording && accepterCondidions) {
        return(
            <ImageBackground
                source={require("../assets/images/splash-bg.jpg")}
                resizeMode="cover"
                className="flex-1 bg-turquoise-2"
            >
                <Loading />
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require("../assets/images/splash-bg.jpg")}
            resizeMode="cover"
            className="flex-1 bg-turquoise-2"
        >
            {loading ? <Loading /> : viewedOnbording && !accepterCondidions ? <ConditionGenerale /> : <Onboarding setViewedOnboarding={setViewedOnboarding} />}
        </ImageBackground>
    );
}
