import { View, Text, Pressable } from 'react-native'
import React from 'react'

interface HelpButtonProps {
  title: string,
  onPress: () => void
}

export default function HelpButton({ title, onPress }: HelpButtonProps) {
  return (
    <Pressable className='absolute bottom-10 z-30' onPress={onPress}>
      <Text className='text-[#FFDC98]'>{title}</Text>
    </Pressable>
  )
}