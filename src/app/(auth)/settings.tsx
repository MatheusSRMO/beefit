import { View, Image } from 'react-native';
import React from 'react';
import { router } from "expo-router";
import ButtonLight from "@/components/buttonLight"
import ProfileHeader from "@/components/profileHeader";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@/components/button';
import ButtonLogin from '@/components/buttonLogin';
import { onSwipePerformed } from '@/lib/utils'
import { AlunoContext } from '@/lib/aluno-context';
import Loading from '@/components/loading';


export default function Settings() {
  const {aluno, atualizaAluno} = React.useContext(AlunoContext);

  if (!aluno) {
    return (
      <View className='flex-1 w-full h-full flex justify-center items-center'>
        {/* TODO: @gbs adiciona aqui o componente de loading */}
        <Loading />
      </View>
    );
  }

  return (
    <View className='w-full h-full flex items-center'>
      <View className="flex flex-row items-center justify-center w-full px-5 pt-10">
        <ProfileHeader firstName={aluno.firstName} lastName={aluno.lastName} url={aluno.url!} />

        <Icon
          name="bars"
          size={30}
          color="#FFDC98"
          className='pt-10'
          onPress={() => {
            router.back()
          }} />
      </View>

      <View className="flex w-full h-full items-center mt-20">
        <Button
          title="Meus rendimentos"
          className='bg-[#4F99DD] w-[90%]'
          onPress={() => {
            router.push('/performance')
          }}
        />
        <Button
          title="Atualizar"
          className='bg-[#4F99DD] w-[90%] mt-5'
          onPress={ async () => {
            await atualizaAluno()
          }}
        />

        <View className="w-full justify-end items-center left-0 mb-10 mt-[90%]">
          <ButtonLogin
            title='Sair'
            className='bg-[#90CAFF] w-4/12 rounded-full py-2'
            onPress={() => {
              router.push('/(public)/login')
            }}
          />
        </View>
      </View>
    </View>
  );
}