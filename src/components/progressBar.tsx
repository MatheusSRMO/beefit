import { cn } from '@/lib/utils';
import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
    progress: number; // Update the type to be a number
    className?: string;
}

export default function ProgressBar({ progress, className }:ProgressBarProps) {
  const width = progress * 100; // Converte progresso relativo para porcentagem

  return (
    <View className={cn('h-5 bg-[#194064] rounded-full', className)}>
      <View style={{ width: `${width}%` }} className='bg-[#74d3e7] h-5 rounded-full' />
    </View>
  );
};
