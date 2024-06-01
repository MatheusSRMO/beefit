import { View, ScrollView, Image } from 'react-native';
import React from 'react';
import Calendar from '@/components/calendar';
import { StatusBar } from 'expo-status-bar';
import ProgressOverview from '@/components/progressOverview';
import ProfileHeader from '@/components/profileHeader';

export default function Main() {
  return (
    <View className='w-full h-full flex justify-center items-center pt-20'>
      <StatusBar style="light" backgroundColor='#192C64' />

      <ProfileHeader name='Matheus Souza Ribeiro' imageSource='Avatar' />

      <View className="flex my-10 py-10 w-[90%] h-[90%] rounded-3xl">
        <Image
          source={require('@/assets/images/bg-main.png')}
          className='absolute w-full h-[105%] top-0 left-0 right-0 bottom-0 rounded-3xl'
          style={{ resizeMode: 'stretch' }}
        />

        <ScrollView
          className='w-full h-full mb-10'
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Aqui colocamos o componente Calendar */}
          <Calendar />

          <ProgressOverview progress={0.3} />
          <ProgressOverview progress={0.1} />
          <ProgressOverview progress={0.2} />
          <ProgressOverview progress={0.3} />

        </ScrollView>

      </View>
    </View>
  );
}
