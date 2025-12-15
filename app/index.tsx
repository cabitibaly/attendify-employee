import Onboarding from "@/components/onboarding/onboarding";
import { ImageBackground } from "react-native";

export default function Index() {
  return (
    <ImageBackground
      source={require("../assets/images/splash-bg.jpg")}
      resizeMode="cover"
      className="flex-1 bg-turquoise-4"
    >
      <Onboarding />
    </ImageBackground>
  );
}
