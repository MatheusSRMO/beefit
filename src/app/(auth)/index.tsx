import { View, ScrollView, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Calendar from '@/components/calendar';
import ProgressOverview from '@/components/progressOverview';
import ProfileHeader from '@/components/profileHeader';
import { useRouter } from 'expo-router';
import ButtonLight from '@/components/buttonLight';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Gesture from 'react-native-swipe-gesture-handler';
// import { SwipeGesture } from "react-native-swipe-gesture-handler";
import { onSwipePerformed } from '@/lib/utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useAuth } from '@clerk/clerk-expo';


export default function Main() {
  const [target, setTarget] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { userId } = useAuth();

  const loadTarget = async () => {
    try {
      const value = await AsyncStorage.getItem('@target');
      if (value !== null) {
        setTarget(parseInt(value, 10));
      }
    } catch (e) {
      console.error('Failed to fetch the data from storage', e);
    }
  };

  useEffect(() => {
    loadTarget();

    (
      async () => {
        const url = `https://beefit-admin.vercel.app/api/aluno/${userId}`;
        console.log('url:', url);

        setLoading(true);
        const user = await axios.get(url);
        console.log(user.data);

        if(user.status !== 200 || !user.data || user.data.status !== 200) {
          setError(user.data.message || 'Erro ao buscar dados');
          setLoading(false);
          return;
        }

        setLoading(false);
      }
    )();
  }, []);

  if (loading) {
    return (
      <View className='w-full h-full flex items-center justify-center'>
        <LottieView
          source={require('../../assets/animations/loader_yellow.json')}
          autoPlay
          loop
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    );
  }

  if(error) {
    return (
      <View className='w-full h-full flex items-center justify-center gap-5'>
        <Text className='font-semibold text-red-600 text-3xl text-center'>Erro ao buscar dados, caso persista, entre em contato com suporte@beefit.com</Text>
        <Text className='text-red-50 text-xl font-extralight'>{error}</Text>
      </View>
    );
  }

  return (
    <View className='w-full h-full flex items-center'>
      {/* <SwipeGesture onSwipePerformed={onSwipePerformed}> */}
      {/* <View className="flex flex-row items-center justify-center w-[90%]">
          <ProfileHeader/>
          <Icon name="bars" size={30} color="#FFDC98"
            className='pt-10'
            onPress={() => {
              router.push('./settings');
            }}
          />
        </View> */}

      <View className="flex my-10 w-[90%] h-[100%] rounded-3xl justify-center align-center items-center">
        <Image
          source={require('@/assets/images/bg-calendar.png')}
          className='absolute items-center w-full h-[50%] top-0 left-0 right-0 bottom-0 rounded-3xl'
        />

        <View className='absolute w-full h-[50%] justify-center align-center items-center left-0 top-0'>
          <Calendar
            onDayPress={(day: { dateString: string; }) => {
              router.push({
                pathname: './exercises',
                params: {
                  date: day.dateString,
                },
              });
            }}
          />
          <ProgressOverview progress={2} total={target} />
        </View>

        <View className="absolute w-full justify-end align-center left-0 pt-[60%] pb-10">
          <ButtonLight
            title="Treino"
            className='bg-[#90CAFF] w-full'
            onPress={() => {
              router.push('./training');
            }}
          />
        </View>
      </View>
      {/* </SwipeGesture> */}
    </View>
  );
}
