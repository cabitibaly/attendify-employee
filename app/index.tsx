import Loading from "@/components/loading/loading";
import Onboarding from "@/components/onboarding/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const [viewedOnbording, setViewedOnboarding] = useState<boolean>(false);

  const checkOnboarding = async () => {
    try {

      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if(value !== null) {
        setViewedOnboarding(true);
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

    if(!loading && viewedOnbording) {      
      router.replace("/condition-generale")      
    }    

  }, [loading, viewedOnbording])  

  return (
    <ImageBackground
      source={require("../assets/images/splash-bg.jpg")}
      resizeMode="cover"
      className="flex-1"
    >
      {loading ? <Loading /> : viewedOnbording ? "" : <Onboarding setViewedOnboarding={setViewedOnboarding} />}
    </ImageBackground>
  );
}
