import { View, Text, Image, TextInput, Pressable } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Button from '@/components/button';
import { useRouter } from 'expo-router';

export default function signIn() {
  const router = useRouter();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View className='w-full h-full flex items-center justify-center'>
      <Image source={require('@/assets/images/loginBg.png')} className='absolute -top-1 left-0 w-full' style={{
        resizeMode: 'stretch',
      }} />
      <StatusBar style="light" backgroundColor='#192C64' />

      <Text className='absolute top-24 text-[#FFDC98] text-4xl'>Oi Aluno </Text>

      <View className='w-full flex items-center justify-center gap-5'>
        <TextInput
          onChangeText={setUsername}
          value={username}
          placeholder='Usuário'
          className='bg-[#21175C] text-[#FFDC98] text-xl px-10 py-3 w-9/12 rounded-3xl placeholder:text-[#FFDC98]'
        />

        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder='Senha'
          className='bg-[#21175C] text-[#FFDC98] text-xl px-10 py-3 w-9/12 rounded-3xl placeholder:text-[#FFDC98]'
          keyboardType='visible-password'
        />
      </View>

      <Button title='Entrar' className='bg-[#528AA5] w-6/12 mt-10 rounded-full py-2' onPress={() => { }} />

      <Pressable className='absolute bottom-10 z-30' onPress={() => {
        router.push('/signUp')
      }}>
        <Text className='text-[#FFDC98]'>Dúvidas?</Text>
      </Pressable>
    </View>
  )
}