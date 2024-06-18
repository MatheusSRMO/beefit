import { View, Text } from 'react-native'
import React from 'react'
import Avatar from './avatar'
import { router } from 'expo-router';

interface ProfileHeaderProps {
  name: string,
  lastName: string,
  imageSource: string
}

export default function ProfileHeader({ name, lastName, imageSource }: ProfileHeaderProps) {
  return (
    <View className="flex flex-row items-center justify-center w-[90%] pt-10">

      <Avatar source={{
        uri: imageSource
      }} />

      <View className="flex-1 max-w-full ml-3">
        <Text className="text-[#FFDC98] text-3xl mr-1 font-bold flex-wrap">
          {name}
        </Text>
        <Text className="text-[#FFDC98] text-3xl mr-1 font-bold flex-wrap">
          {lastName}
        </Text>
      </View>
      
    </View>
  )
}