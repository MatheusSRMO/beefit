import { View, Image, Animated, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, } from 'react-native';
import React, { useEffect } from 'react';
import { router } from "expo-router";
import ButtonLight from "@/components/buttonLight"
import ProfileHeader from "@/components/profileHeader";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@/components/button';
import ButtonLogin from '@/components/buttonLogin';
// import { SwipeGesture } from 'react-native-swipe-gesture-handler';
import { onSwipePerformed } from '@/lib/utils'
import ProgressOverview from '@/components/progressOverview';
import TextInput from '@/components/textInput';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Settings() {
    const [target, setTarget] = React.useState('');
    const [progress, setProgress] = React.useState('');
    const [showNumDays, setShowNumDays] = React.useState(false);

    const calculatePercentage = (progress: number, target: number): number => {
        if (target === 0) return 0;
        return Math.min((progress / target) * 100, 100); 
    };

    const percentage = calculatePercentage(parseInt(progress) || 0, parseInt(target) || 0);

    const saveTarget = async (value: string) => {
        try {
            await AsyncStorage.setItem('@target', value);
        } catch (e) {
            console.error('Failed to save the data to the storage');
        }
    };
    
    const loadTarget = async () => {
        try {
            const value = await AsyncStorage.getItem('@target');
            if (value !== null) {
                setTarget(value);
            }
        } catch (e) {
            console.error('Failed to fetch the data from storage');
        }
    };

    useEffect(() => {
        loadTarget();
    }, []);

    useEffect(() => {
        saveTarget(target);
    }, [target]);
    

    return(
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='w-full h-full flex-1'
    >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {/* <SwipeGesture onSwipePerformed={onSwipePerformed}> */}

                    <Animated.Image source={require('@/assets/images/loginBg.png')} 
                        className='absolute w-full justify-start align-center items-center left-0 top-0' style={{
                        resizeMode: 'stretch',
                    }} />

                    <View className='items-center align-center h-[30%'
                        style={{
                            left: 50,
                            transform: [
                                // { translateX: -50 }, // Metade da largura do contêiner
                                { translateY: 50 }, // Metade da altura do contêiner
                            ],
                        }}>
                        <Animated.Text className='absolute text-[#FFDC98]' style={{
                            marginTop: -20,
                            left: 0,
                            // textAlign: 'center',
                            fontFamily: 'Roboto_900Black',
                            fontSize: 32
                        }}>Seus</Animated.Text>

                        <Animated.Text className='absolute text-[#FFDC98] mt-1' style={{
                            left: 0,
                            // textAlign: 'center',
                            fontFamily: 'Roboto_900Black',
                            fontSize: 53
                        }}>rendimentos</Animated.Text>
                    </View>
                        
                    <View className="flex flex-col w-[90%] pt-60 mt-10 rounded-3xl">
                        <View className='items-center align-center justify-center w-full h-40'>
                            <Image
                                source={require('@/assets/images/bg-calendar.png')}
                                className='absolute w-full h-[60%] rounded-3xl left-5 top-0'
                            />

                            <View className='absolute w-full h-[50%] items-center justify-center left-5 top-0'>
                                <ProgressOverview progress={2} total={parseInt(target) || 0}/>
                            </View>
                        </View>
                        
                        <Text className='text-white' style={{
                            marginTop: -40,
                            left: 20,
                            textAlign: 'center',
                            fontFamily: 'Roboto_400Regular',
                            fontSize: 16}}>
                            Você treinou {progress || 0} dias essa semana!
                        </Text>
                        <Text className='text-white' style={{
                            marginTop: 0,
                            left: 20,
                            textAlign: 'center',
                            fontFamily: 'Roboto_400Regular',
                            fontSize: 16}}>
                            {percentage}% da sua meta :)
                        </Text>

                        <Text className='text-[#FFDC98]' style={{
                            marginTop: 40,
                            left: 20,
                            // textAlign: 'center',
                            fontFamily: 'Roboto_500Medium',
                            fontSize: 24}}>
                            Meta atual: 
                        </Text>

                        <Text className='text-white' style={{
                            // marginTop: -20,
                            left: 20,
                            fontFamily: 'Roboto_400Regular',
                            fontSize: 16}}>
                            Treinar {target || 0} dias na semana.
                        </Text>

                        <Button
                            title="Atualizar meta"
                            className='bg-[#4F99DD] w-[50%] p-2 mt-5 left-5'
                            onPress={() => {
                                setShowNumDays(true);
                            }}
                        />
                        
                        {showNumDays && (
                        <View className='w-full rounded-3xl mt-5 left-5'>
                            {/* <Text className='text-white' style={{
                                // marginTop: -20,
                                // left: 20,
                                fontFamily: 'Roboto_500Medium',
                                fontSize: 16}}>
                                Deseja treinar quanto dias por semana?
                            </Text> */}

                            <View className='w-full'>
                                <TextInput value={target} setValue={setTarget} placeholder='Deseja treinar quantos dias por semana?' type='number-pad' />
                            </View>
                            
                        </View>
                        )}
                    </View>
                {/* </SwipeGesture> */}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
       
    );
}
