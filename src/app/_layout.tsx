import "@/styles/global.css";
import { SafeAreaView } from "react-native";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
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
import Loading from "./(public)/loading";
import { Slot, useRouter, useSegments } from 'expo-router';
import React from "react";
import * as SecureStore from 'expo-secure-store';

interface InitialLayoutProps {
  loading: boolean;
}

const InitialLayout = ({ loading }: InitialLayoutProps) => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(auth)');
    } else if (!isSignedIn) {
      router.replace('/(public)');
    }
  }, [isSignedIn]);

  // se não estiver carregado, exibe o loading
  if (!isLoaded || loading) {
    return <Loading />;
  }

  return <Slot />; // exibe o slot (rota atual)
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


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

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      // tokenCache={tokenCache}
    >
      <SafeAreaView className="items-center justify-center w-full h-full bg-[#080835]">
        <InitialLayout loading={!fontsLoaded} />
      </SafeAreaView>
    </ClerkProvider>
  );
}