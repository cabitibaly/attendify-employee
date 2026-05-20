import Loading from "@/components/loading/loading";
import ConditionGenerale from "@/components/onboarding/condition-generale";
import Onboarding from "@/components/onboarding/onboarding";
import { useOnboarding } from "@/hooks/onboarding/useOnboarding";
import { ImageBackground } from "react-native";

export default function Index() {
    const { accepterCondidions, loading, viewedOnbording, setViewedOnboarding } = useOnboarding();

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
            {!viewedOnbording && (
                <Onboarding setViewedOnboarding={setViewedOnboarding} />
            )}

            {viewedOnbording && !accepterCondidions && (
                <ConditionGenerale />
            )}
        </ImageBackground>
    );
}
