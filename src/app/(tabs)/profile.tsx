import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function Profile() {
  return (
    <View>
      <Text className='text-white text-2xl'>Profile</Text>

      {/* muda a status bar */}
      <StatusBar style="light" backgroundColor='#080835' />
    </View>
  )
}