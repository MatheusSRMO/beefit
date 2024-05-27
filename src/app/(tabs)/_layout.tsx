import "@/styles/global.css";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#080835' }} className="items-center justify-center" >
            { children }
            <Slot />
            
        </SafeAreaView>
    );
}