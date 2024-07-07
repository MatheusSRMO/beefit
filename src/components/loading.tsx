import LottieView from 'lottie-react-native';
import React from 'react';

interface LoadingProps {
  size?: 'small' | 'large',
}

export default function Loading({ size = 'large' }: LoadingProps) {

  return (
    <LottieView
      source={require('../assets/animations/loader_yellow.json')}
      autoPlay
      loop
      style={{
        width: size === 'small' ? 100 : 200,
        height: size === 'small' ? 100 : 200,
      }}
    />
  );
};
