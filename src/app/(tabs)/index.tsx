import Button from '@/components/button';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import { Link, useRouter } from 'expo-router';

export default function Home() {
    const router = useRouter();


    return (

        <View className='w-full h-full flex items-center justify-around'>
            {/* muda a status bar */}
            <StatusBar style="light" backgroundColor='#192C64' />

            {/* Adiciona uma imagem de fundo */}
            <Image
                source={require('@/assets/images/hive_background.png')}
                className='w-full h-full absolute top-0 left-0 right-0 bottom-0 '
                style={{ resizeMode: 'cover' }}
            />

            <Image
                source={require("@/assets/images/beefit_logo.png")}
                className='z-20' 
            />


            <View className='w-full flex items-center'>
                <Button
                    title="Login"
                    className='bg-[#528AA5] w-9/12'
                    onPress={() => {
                        router.push('/signIn')
                    }}
                />
            </View>

            <Pressable className='absolute bottom-10' onPress={() => {
                router.push('/sign-up')
            }} >
                <Text className='text-[#FFDC98]'>Ainda não é cadastrado?</Text>
            </Pressable>
        </View>




    )
}
