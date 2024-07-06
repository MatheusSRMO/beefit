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

  const backgroundColor = type === 'default' ? '#FFFFFF' : '#21175C';

  return (
    <View
      className={clsx('w-[280px] h-[350px] rounded-3xl', className)}
      style={StyleSheet.flatten([
        type !== 'description' && styles.otherCard,
        type === 'description' && styles.descriptionCard,
        isFocused && styles.focusedCard,
        { backgroundColor },
      ])}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  otherCard: {
    marginHorizontal: 7.2,
    transform: [{ scale: 0.9 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionCard: {
    marginHorizontal: 7.2,
    transform: [{ scale: 0.9 }],
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  focusedCard: {
    transform: [{ scale: 1 }],
    backgroundColor: 'white',
  },
});
