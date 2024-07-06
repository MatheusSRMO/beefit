import { View, StyleSheet } from 'react-native';
import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children?: React.ReactNode;
  isFocused: boolean;
  className?: string;
  type: 'default' | 'description' | 'end';
}

export default function Card({ isFocused, children, className, type }: CardProps) {

  // Definindo a cor de fundo com base no tipo ('default' ou 'exercise')
  const backgroundColor = type === 'default' ? '#FFFFFF' : '#21175C';

  return (
    <View
      className={clsx('w-[280px] rounded-3xl justify-center items-center ', className)}
      style={StyleSheet.flatten([
        styles.card,
        isFocused && styles.focusedCard,
        { backgroundColor },
      ])}
    >
      {children}
      {/* {type === 'description' ? (
        <View className='flex flex-col w-full h-full'></View>
      ) : (
        <View className='flex flex-col justify-start'></View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 7.2,
    transform: [{ scale: 0.9 }],
  },
  focusedCard: {
    transform: [{ scale: 1 }],
    backgroundColor: 'white',
  },
});
