import { View, Text } from 'react-native'
import React from 'react'
import LoadingC from '@/components/loading'
import { StatusBar } from 'expo-status-bar'

export default function Loading() {
  return (
    <View className='flex-1 bg-[#194064]'>
      <StatusBar style="light" backgroundColor='#194064' />
      <LoadingC />
    </View>
  )
}