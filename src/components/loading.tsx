import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';


export default function Loading() {

  return (
    <View className='flex-1 items-center justify-center'>
      <ActivityIndicator size="large" color="#FFDC98" />
    </View>
  );
};
