import { View, Text } from 'react-native'
import React from 'react'
import ProgressBar from './progressBar'

interface ProgressOverviewProps {
  progress: number
}

export default function ProgressOverview({ progress }: ProgressOverviewProps) {
  return (
    <View className='bg-[#080835] p-3 mt-10 w-[90%] rounded-full'>
      <Text className="text-[#FFDC98] text-2xl font-bold -top-8">Seus Rendimentos</Text>

      {/* ProgressBar */}
      <ProgressBar progress={progress} className='-top-4' />
    </View>
  )
}