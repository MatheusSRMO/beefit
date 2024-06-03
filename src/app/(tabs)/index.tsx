import Button from '@/components/button';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Image, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router';
import HelpButton from '@/components/helpButton';

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground source={require('@/assets/images/hive_background.png')} className='w-full h-full flex items-center justify-around'>
      {/* muda a status bar */}
      <StatusBar style="light" backgroundColor='#080835' />

      <Image
        source={require("@/assets/images/beefit_logo.png")}
        className='z-20 flex-1'
        style={{ resizeMode: 'contain' }}
      />

      <View className='w-full flex-1 items-center justify-center'>
        <Button
          title="Login"
          className='bg-[#528AA5] w-9/12'
          onPress={() => {
            router.push('/(auth)/signIn')
          }}
        />
      </View>

      <HelpButton title='Ainda não é cadastrado?' onPress={() => { }} />
    </ImageBackground>
  )
}
