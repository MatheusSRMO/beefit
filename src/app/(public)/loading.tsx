import { View } from 'react-native'
import React from 'react'
import LoadingC from '@/components/loading'
import { StatusBar } from 'expo-status-bar'

export default function Loading() {
  return (
    <View className='w-full h-full bg-[#528AA5]'>
      <StatusBar style="light" backgroundColor='#528AA5' />
      <LoadingC />
    </View>
  )
}