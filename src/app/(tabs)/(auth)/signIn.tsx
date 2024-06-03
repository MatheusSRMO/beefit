import { View, Keyboard, Animated, Easing } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Button from '@/components/button';
import { useRouter } from 'expo-router';
import TextInput from '@/components/textInput';
import HelpButton from '@/components/helpButton';

export default function SignIn() {
  const router = useRouter();

  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const imageTop = React.useRef(new Animated.Value(-1)).current;
  const textTop = React.useRef(new Animated.Value(70)).current;

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        Animated.timing(imageTop, {
          toValue: -150,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
        Animated.timing(textTop, {
          toValue: -100,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        Animated.timing(imageTop, {
          toValue: -1,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
        Animated.timing(textTop, {
          toValue: 70,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View className='w-full h-full flex items-center justify-center'>
      <Animated.Image source={require('@/assets/images/loginBg.png')} className='absolute left-0 w-full' style={{
        resizeMode: 'stretch',
        top: imageTop
      }} />
      <StatusBar style="light" backgroundColor='#141440' />

      <Animated.Text className='absolute text-[#FFDC98] text-4xl' style={{
        top: textTop
      }}>Oi Aluno </Animated.Text>

      <Animated.View className='w-full flex items-center justify-center gap-5' style={{ top: textTop }}>
        <TextInput value={username} setValue={setUsername} placeholder='Usuário' type='default' />
        <TextInput value={password} setValue={setPassword} placeholder='Senha' type='visible-password' />
        
        <Button title='Entrar' className='bg-[#528AA5] w-6/12 mt-10 rounded-full py-2' onPress={() => {
          router.push('/main')
        }} />
      </Animated.View>


      <HelpButton title='Dúvidas?' onPress={() => {}} />
    </View>
  );
}
