import Button from '@/components/button';
import { StatusBar } from 'expo-status-bar';
import { MailIcon } from 'lucide-react';
import React from 'react'
import { Text, View, Image, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


export default function Home() {
    const router = useRouter();


    return (

        <>
            <View className='w-full flex items-center'>
                <Button
                    icon={null}
                    title="Entrar com Email"
                    onPress={() => {
                        router.push('/profile')
                    }}
                    className='bg-[#528AA5] w-9/12'
                />
            </View>
            {/* muda a status bar */}
            <StatusBar style="light" backgroundColor='#080835' />
        </>




    )
}
