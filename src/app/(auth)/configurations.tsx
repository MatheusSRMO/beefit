import { View, Image } from 'react-native';
import React from 'react';
import { router } from "expo-router";
import ButtonLight from "@/components/buttonLight";
import ProfileHeader from "@/components/profileHeader";
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@/components/button';



export default function Configurations() {

    return(
        <View className='w-full h-full flex justify-center items-center pt-20'>

            <View className="flex flex-row items-center justify-center w-[90%] pt-10">
                <ProfileHeader name='Matheus' lastName='Souza Ribeiro' imageSource='https://github.com/MatheusSRMO.png' />

                <Icon name="bars" size={30} color="#FFDC98" 
                onPress={() => {
                    router.back()
                }}/>

            </View>

            <View className="flex items-center my-10 py-10 w-[90%] h-[90%] rounded-3xl">

                <Button
                    title="Atualizar foto de perfil"
                    className='bg-[#4F99DD] w-full'
                    onPress={() => {
                        router.push('/(public)/loading')
                    }}
                />
                <Button
                    title="Meus rendimentos"
                    className='bg-[#4F99DD] w-full mt-5'
                    // onPress={() => {
                    //     router.push('./training')
                    // }}
                />

            </View>
            </View>
    );
}