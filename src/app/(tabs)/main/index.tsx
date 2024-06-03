import { View, ScrollView, Image } from 'react-native';
import React from 'react';
import Calendar from '@/components/calendar';
import { StatusBar } from 'expo-status-bar';
import ProgressOverview from '@/components/progressOverview';
import ProfileHeader from '@/components/profileHeader';
import { useRouter } from 'expo-router';

export default function Main() {
  const router = useRouter();
  return (
    <View className='w-full h-full flex justify-center items-center pt-20'>
      <StatusBar style="light" backgroundColor='#080835' />

      <ProfileHeader name='Matheus Souza Ribeiro' imageSource='https://github.com/MatheusSRMO.png' />

      <View className="flex my-10 py-10 w-[90%] h-[90%] rounded-3xl">
        <Image
          source={require('@/assets/images/bg-main.png')}
          resizeMode='stretch'
          className='absolute w-full h-[105%] top-0 left-0 right-0 bottom-0 rounded-3xl'
        />

        <ScrollView
          className='w-full h-full mb-10 rounded-3xl'
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Aqui colocamos o componente Calendar */}
          <Calendar onDayPress={(day: { dateString: string; }) => {
            router.push({
              pathname: './training',
              params: {
                date: day.dateString,
              },
            });
          }}/>

          <ProgressOverview progress={0.8} />
          <ProgressOverview progress={0.1} />
          <ProgressOverview progress={0.2} />
          <ProgressOverview progress={0.3} />

        </ScrollView>

      </View>
    </View>
  );
}
