import { View, Keyboard, Animated, Easing, Pressable } from 'react-native';
import React from 'react';
import Button from '@/components/button';
import TextInput from '@/components/textInput';
import HelpButton from '@/components/helpButton';
import { useSignIn } from "@clerk/clerk-expo";
import ButtonLight from '@/components/buttonLight';
import ButtonLogin from '@/components/buttonLogin';

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

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: username,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });

    } catch (err: any) {
      console.error(err);
      alert('Usuário ou senha inválidos');
    }
  }, [isLoaded, username, password]);

  return (
    <View className='w-full h-full flex-1 items-center justify-center'>
       <Animated.Image source={require('@/assets/images/loginBg.png')} className='absolute left-0 w-full' style={{
        resizeMode: 'stretch',
        top: imageTop
      }} />
      {/* <StatusBar style="light" backgroundColor='#141440' /> */}

      <View className='absolute top-0 left-0 right-0 items-center'
        style={{
          left: '45%',
          transform: [
            { translateX: -50 }, // Metade da largura do contêiner
            // { translateY: -50 }, // Metade da altura do contêiner
          ],
        }}
      >
        <Animated.Text className='absolute text-[#FFDC98]' style={{
          top: titleTop,
          marginTop: -20,
          left: 0,
          // textAlign: 'center',
          fontFamily: 'Roboto_900Black',
          fontSize: 32
        }}>Oi</Animated.Text>

        <Animated.Text className='absolute text-[#FFDC98] mt-1' style={{
          top: titleTop,
          left: 0,
          // textAlign: 'center',
          fontFamily: 'Roboto_900Black',
          fontSize: 53
        }}>Aluno</Animated.Text>
      </View>

      <Animated.View className='w-full flex items-center justify-center gap-5' style={{ top: textTop }}>

        <View className='w-[80%] gap-5'>
          <TextInput value={username} setValue={setUsername} placeholder='Usuário' type='default' />
          <TextInput value={password} setValue={setPassword} placeholder='Senha' type='password' />  
        </View>

                  

        
        <ButtonLogin title='Entrar' className='bg-[#90CAFF] w-4/12 mt-10 rounded-full py-2 px-3' onPress={onSignInPress} />
      </Animated.View>


      {/* <HelpButton title='Dúvidas?' onPress={() => {}} /> */}
    </View>
  );
}