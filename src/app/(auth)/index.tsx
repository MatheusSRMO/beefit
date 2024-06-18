import { View, ScrollView, Image } from 'react-native';
import React from 'react';
import Calendar from '@/components/calendar';
import ProgressOverview from '@/components/progressOverview';
import ProfileHeader from '@/components/profileHeader';
import { useRouter } from 'expo-router';
import ButtonLight from '@/components/buttonLight';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Main() {
  const router = useRouter();
  return (
    <View className='w-full h-full flex justify-center items-center pt-20'>

      <View className="flex flex-row items-center justify-center w-[90%] pt-10">
        <ProfileHeader name='Matheus' lastName='Souza Ribeiro' imageSource='https://github.com/MatheusSRMO.png' />

        <Icon name="bars" size={30} color="#FFDC98" 
          onPress={() => {
            router.push('./configurations')
          }}/>

      </View>

      <View className="flex items-center my-10 py-10 w-[90%] h-[90%] rounded-3xl">
        <Image
          source={require('@/assets/images/bg-calendar.png')}
          // resizeMode='stretch'
          className='absolute w-full h-[75%] top-0 left-0 right-0 bottom-0 rounded-3xl'
        />

        <ScrollView
          className='w-full h-full mb-10 rounded-3xl'
          contentContainerStyle={{
            flexGrow: 1,
            // justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Calendar onDayPress={(day: { dateString: string; }) => {
            router.push({
              pathname: './training',
              params: {
                date: day.dateString,
              },
            });
          }}
          />

        <ProgressOverview progress={0.8} />

        <ButtonLight
          title="Treino"
          className='bg-[#90CAFF] w-full mt-20'
          onPress={() => {
            router.push('./training')
          }}
        />

          
          {/* <ProgressOverview progress={0.1} />
          <ProgressOverview progress={0.2} />
          <ProgressOverview progress={0.3} /> */}

        </ScrollView>

      </View>
    </View>
  );
}

{/* <View className="flex my-10 py-10 w-[90%] h-[90%] rounded-3xl">
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

      </View> */}