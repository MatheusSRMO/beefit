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
    <View className='w-full h-full flex items-center justify-center'>
      <View className="flex flex-row items-center justify-center w-[90%] pt-40">
        <ProfileHeader name='Matheus' lastName='Souza Ribeiro' imageSource='https://github.com/MatheusSRMO.png' />
        <Icon
          name="bars"
          size={30}
          color="#FFDC98"
          onPress={() => {
            router.push('./settings');
          }}
        />
      </View>

      <View className="flex my-10 w-[90%] h-[90%] rounded-3xl">
        <Image
          source={require('@/assets/images/bg-calendar.png')}
          className='absolute w-full h-[60%] top-0 left-0 right-0 bottom-0 rounded-3xl'
        />

        <View className='flex w-full h-[60%] top-0 left-0 right-0 bottom-0 rounded-3xl justify-center items-center'>
          <Calendar
            onDayPress={(day: { dateString: string; }) => {
              router.push({
                pathname: './training',
                params: {
                  date: day.dateString,
                },
              });
            }}
          />
          <ProgressOverview progress={0.8} />
        </View>

        <View className="flex-1 justify-end w-full pb-40">
          <ButtonLight
            title="Treino"
            className='bg-[#90CAFF] w-full'
            onPress={() => {
              router.push('./training');
            }}
          />
        </View>
      </View>
    </View>
  );
}
