import { createContext } from "react";

interface OnboardingContextType {
    loading: boolean
    viewedOnbording: boolean,
    setViewedOnboarding: React.Dispatch<React.SetStateAction<boolean>>
    accepterCondidions: boolean
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export default OnboardingContext