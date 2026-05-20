import OnboardingContext from "@/context/onboarding/onboardingContext"
import { useContext } from "react"

export const useOnboarding = () => {
    const context = useContext(OnboardingContext)

    if (!context) {
        throw new Error("useOnboarding must be used within a OnboardingProvider")
    }

    return {
        loading: context.loading,
        viewedOnbording: context.viewedOnbording,
        accepterCondidions: context.accepterCondidions,
        setViewedOnboarding: context.setViewedOnboarding,
    }
}