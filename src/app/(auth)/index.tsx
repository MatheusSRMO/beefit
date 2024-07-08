import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Calendar from '@/components/calendar';
import { View, Image, Text } from 'react-native';
import { AlunoContext } from '@/lib/aluno-context';
import ButtonLight from '@/components/buttonLight';
import ProfileHeader from '@/components/profileHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressOverview from '@/components/progressOverview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '@/components/loading';


export default function Main() {
  const router = useRouter();
  const [progress, setProgress] = React.useState(0);
  const [target, setTarget] = React.useState<number>(0);
  const aluno = React.useContext(AlunoContext);

  useEffect(() => {
    if (aluno) {
      const treinosFinalizados = aluno.treinos.filter(treino => treino.finalizado === true).length;
      setProgress(treinosFinalizados);
    }
  }, [aluno]);

  React.useEffect(() => {
    (
      async () => {
        try {
          const value = await AsyncStorage.getItem('@target');
          if (value !== null) {
            setTarget(parseInt(value, 10));
          }
        } catch (e) {
          console.error('Failed to fetch the data from storage', e);
        }
      }
    )();
  }, []);

  if(!aluno) {
    return (
      <View className='flex-1 w-full h-full flex justify-center items-center'>
        <Loading />
      </View>
    );
  }

  return (
    <View className='w-full h-full flex items-center justify-center'>
      <View className="flex flex-row items-center justify-center w-full px-5 pt-10">
        <ProfileHeader firstName={aluno.firstName} lastName={aluno.lastName} url={aluno.url!} />
        <Icon
          name="bars"
          size={30}
          color="#FFDC98"
          className='pt-10'
          onPress={() => {
            router.push('./settings');
          }}
        />
      </View>

      <View className="flex my-auto w-[90%] h-[60vh] rounded-3xl justify-center align-center items-center relative">
        <Image
          source={require('@/assets/images/bg-calendar.png')}
          className='absolute items-center w-full h-full rounded-3xl'
        />

        <View className='w-full h-[50%] justify-center items-center'>
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
          <ProgressOverview progress={progress} total={target} />
        </View> 
      </View>

      <View className="w-[90%] justify-end align-center mb-16">
        <ButtonLight
          title="Treino"
          className='bg-[#90CAFF] w-full'
          onPress={() => {
            router.push('./training');
          }}
        />
      </View>
    </View>
  );
}
