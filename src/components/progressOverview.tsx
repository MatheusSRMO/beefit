import { View, Text } from 'react-native'
import React from 'react'
import ProgressBar from './progressBar'

interface ProgressOverviewProps {
  progress: number;
  total: number;
}

export default function ProgressOverview({ progress, total }: ProgressOverviewProps) {
  return (
    <View className=' flex items-center justify-center bg-[#080835] p-1 mt-10 w-[85%] rounded-full'>
      <Text className="text-[#FFDC98] text-2xl font-bold -top-6 -left-20">Seu rendimento</Text>

      {/* ProgressBar */}
      <ProgressBar progress={progress} total={total} className='-top-4' />
    </View>
  )
}