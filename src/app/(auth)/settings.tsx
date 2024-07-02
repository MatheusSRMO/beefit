import { View, Image } from 'react-native';
import React from 'react';
import { router } from "expo-router";
import ButtonLight from "@/components/buttonLight"
import ProfileHeader from "@/components/profileHeader";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@/components/button';
import ButtonLogin from '@/components/buttonLogin';
// import { SwipeGesture } from 'react-native-swipe-gesture-handler';
import { onSwipePerformed } from '@/lib/utils'


export default function Settings() {

    return(
        <View className='w-full h-full flex items-center'>
            {/* <SwipeGesture onSwipePerformed={onSwipePerformed}> */}
                <View className="flex flex-row items-center justify-center w-[90%]">
                    <ProfileHeader/>
                    <Icon name="bars" size={30} color="#FFDC98" 
                    className='pt-10'
                    onPress={() => {
                        router.back()
                    }}/>
                </View>

                <View className="flex my-10 w-[90%] h-[100%] justify-center align-center items-center">
                     <View className="absolute items-center w-full left-0 top-0">
                        {/* <Button
                            title="Atualizar foto de perfil"
                            className='bg-[#4F99DD] w-full mt-20 p-3'
                            onPress={() => {
                                router.push('/(public)/loading')
                            }}
                        /> */}
                        <Button
                            title="Meus rendimentos"
                            className='bg-[#4F99DD] w-full mt-5 p-3'
                            onPress={() => {
                                router.push('/performance')
                            }}
                        />
                    </View>
                    <View className="absolute w-full justify-end align-center items-center left-0 pt-[80%] pb-10">
                        <ButtonLogin 
                            title='Sair' 
                            className='bg-[#90CAFF] w-4/12 rounded-full py-2' 
                            onPress={() => {
                                router.push('/(public)/login')
                            }}
                        /> 
                    </View>
                </View>
            {/* </SwipeGesture> */}
        </View>
    );
}