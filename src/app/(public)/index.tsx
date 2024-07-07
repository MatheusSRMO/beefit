import Button from '@/components/button';
import React from 'react'
import { View, Image, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router';
import HelpButton from '@/components/helpButton';

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground source={require('@/assets/images/bg-gradient.png')} className='w-full h-full flex items-center justify-around'>

      <Image
        source={require("@/assets/images/hive_background.png")}
        className='absolute top-0 left-0 w-full h-full'
        style={{ resizeMode: 'cover' }}
      />

      <Image
        source={require("@/assets/images/beefit_logo.png")}
        className='top-20 z-20 flex-1'
        style={{ resizeMode: 'contain' }}
      />

      <View className='w-full flex-1 items-center justify-center'>
        <Button
          title="Login"
          className='bg-[#4F99DD] w-9/12 py-2'
          onPress={() => {
            router.push('./login')
          }}
        />
      </View>

      {/* <HelpButton title='Ainda não é cadastrado?' onPress={() => { }} /> */}
    </ImageBackground>
  )
}
