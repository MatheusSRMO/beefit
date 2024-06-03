import { View, Text } from 'react-native'
import React from 'react'
import Avatar from './avatar'

interface ProfileHeaderProps {
  name: string,
  imageSource: string
}

export default function ProfileHeader({ name, imageSource }: ProfileHeaderProps) {
  return (
    <View className="flex flex-row items-center justify-center w-[90%] pt-10">
      <View className="flex-1 max-w-full">
        <Text className="text-[#FFDC98] text-3xl mr-1 font-bold flex-wrap">
          {name}
        </Text>
      </View>
      <Avatar source={{
        uri: imageSource
      }} />
    </View>
  )
}