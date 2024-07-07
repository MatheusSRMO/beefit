import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <LottieView
        source={require('../../assets/animations/loader_yellow.json')}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
};

export default Loader;
