import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import clsx from 'clsx';
import { cn } from '@/lib/utils';

interface CardProps {
  children?: React.ReactNode;
  isFocused: boolean;
  className?: string;
  group: number;
  type: 'default' | 'exercise' | 'end';
}

export default function Card({ isFocused, children, className, group, type }: CardProps) {
  let cardHeight = 420; // Altura padrão
  switch (group) {
    case 1:
      cardHeight = 420;
      break;
    case 2:
      cardHeight = 220;
      break;
    case 3:
      cardHeight = 150;
      break;
  }

  // Definindo a cor de fundo com base no tipo ('default' ou 'exercise')
  const backgroundColor = type === 'default' ? '#FFFFFF' : '#21175C';

  return (
    <View
      className={clsx('w-[280px] rounded-3xl justify-center items-center ', className)}
      style={StyleSheet.flatten([
        styles.card,
        isFocused && styles.focusedCard,
        { height: cardHeight, backgroundColor },
      ])}
    >
      {children}
      {type === 'exercise' ? (
        <View className='flex flex-col w-full h-full'>
          <View className='bg-[#775FD1] w-[90%] left-4 pl-3 py-3 rounded-3xl mt-5'>
            <Text className='text-white' style={{
              fontFamily: 'Roboto_500Medium',
              fontSize: 20}}>
              Nome exercício
            </Text> 
          </View>
          <Text className='text-white mt-3 justify-ent bottom-0' style={{
            left: 20,
            fontFamily: 'Roboto_400Regular',
            fontSize: 16}}>
            3 séries | 8 a 12 repetições {'\n'}carga: 10 kg
          </Text>

          <Text className='text-[#90CAFF] mt-3 justify-ent bottom-0' style={{
            left: 20,
            fontFamily: 'Roboto_400Regular',
            fontSize: 16}}>
            Observações:
          </Text>

        </View>
      ) : (
        <View className='flex flex-col justify-start'>
        </View>
      )}
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
