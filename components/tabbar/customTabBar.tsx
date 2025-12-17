import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import CalendarIcon from "../svg/calendarIcon";
import HomeIcon from "../svg/homeIcon";
import UserProfileIcon from "../svg/userProfileIcon";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
    return (
        <View className="absolute bottom-10 flex-row items-center justify-between w-[90%] self-center bg-turquoise-5/50 rounded-full px-0 py-0">
            {state.routes.map((route, index) => {
                if (["_sitemap", "+not-found"].includes(route.name)) return null;

                const { options } = descriptors[route.key];
                const label =
                options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <AnimatedTouchableOpacity
                        layout={LinearTransition.springify().mass(0.5)}
                        key={route.key}
                        onPress={onPress}
                        style={{ backgroundColor: isFocused ? "#004849" : "transparent" }}
                        className={"flex-row justify-center items-center px-5 py-4 rounded-full"}
                    >
                        {getIconByRouteName(
                            route.name,
                            isFocused ? "#EEEEF0" : "#EEEEF0"
                        )}
                        {isFocused && (
                            <Animated.Text
                                entering={FadeIn.duration(200)}
                                exiting={FadeOut.duration(200)}
                                className={"text-xl text-gris-12 font-medium ml-2"}
                            >
                                {label as string}
                            </Animated.Text>
                        )}
                    </AnimatedTouchableOpacity>
                );
            })}
        </View>
    );

    function getIconByRouteName(routeName: string, color: string) {
        switch (routeName) {
            case "accueil":
                return <HomeIcon size={28} color={color} />;
            case "historique":
                return <CalendarIcon size={28} color={color} />;
            case "profile":
                return <UserProfileIcon size={28} color={color} />;
            default:
                return <HomeIcon size={28} color={color} />;
        }
    }
};

export default CustomNavBar;
