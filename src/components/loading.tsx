import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface LoadingProps {
  size?: 'small' | 'large',
} 

export default function Loading({ size = 'large' }: LoadingProps) {

  return (
    <View className='flex-1 items-center justify-center'>
      <ActivityIndicator size={size} color="#FFDC98" />
    </View>
  );
};
