import { cn } from '@/lib/utils';
import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarProps {
    progress: number; // Update the type to be a number
    total: number;
    className?: string;
}

export default function ProgressBar({ progress, total, className }: ProgressBarProps) {
  let width = 0;
  
  if( total == 0 )  width = 0;
  else if( total < progress )  width = 100;
  else                    width = (progress / total) * 100;

  return (
    <View className={cn('h-3 w-[90%] bg-[#194064] rounded-full', className)}>
      <View style={{ width: `${width}%` }} className='bg-[#74d3e7] h-3 rounded-full' />
    </View>
  );
};