import "@/styles/global.css";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import Loading from "./loading";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#080835' }} className="items-center justify-center w-full h-screen" >
      <Slot />
      {/* <LinearGradient
        // Background Linear Gradient on diagonal
        colors={['#192C64', '#080835']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
          zIndex: -1
        }}
      /> */}

    </SafeAreaView>
  );
}