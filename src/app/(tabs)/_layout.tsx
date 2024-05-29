import "@/styles/global.css";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#080835' }} className="items-center justify-center" >
            {children}
            <Slot />
            <LinearGradient
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
            />

        </SafeAreaView>
    );
}