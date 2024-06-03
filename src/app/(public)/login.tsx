import { View, Keyboard, Animated, Easing } from 'react-native';
import React from 'react';
import Button from '@/components/button';
import TextInput from '@/components/textInput';
import HelpButton from '@/components/helpButton';
import { useSignIn } from "@clerk/clerk-expo";


export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const imageTop = React.useRef(new Animated.Value(-1)).current;
  const textTop = React.useRef(new Animated.Value(100)).current;
  const titleTop = React.useRef(new Animated.Value(80)).current;

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
          toValue: 20,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
        Animated.timing(titleTop, {
          toValue: -50,
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
          toValue: 100,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();
        Animated.timing(titleTop, {
          toValue: 80,
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

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: username,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
      // abre um modal de erro
      alert('Usuário ou senha inválidos');
    }
  };
  return (
    <View className='w-full h-full flex items-center justify-center'>
       <Animated.Image source={require('@/assets/images/loginBg.png')} className='absolute left-0 w-full' style={{
        resizeMode: 'stretch',
        top: imageTop
      }} />
      {/* <StatusBar style="light" backgroundColor='#141440' /> */}

      <Animated.Text className='absolute text-[#FFDC98] text-4xl' style={{
        top: titleTop
      }}>Oi Aluno </Animated.Text>

      <Animated.View className='w-full flex items-center justify-center gap-5' style={{ top: textTop }}>
        <TextInput value={username} setValue={setUsername} placeholder='Usuário' type='default' />
        <TextInput value={password} setValue={setPassword} placeholder='Senha' type='visible-password' />
        
        <Button title='Entrar' className='bg-[#528AA5] w-6/12 mt-10 rounded-full py-2' onPress={onSignInPress} />
      </Animated.View>


      <HelpButton title='Dúvidas?' onPress={() => {}} />
    </View>
  );
}