import Button from '@/components/button';
import clsx from 'clsx';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Animated, ImageBackground, Image } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 280;

const data = [
  { key: '1' },
  { key: '2' },
  { key: '3' },
  { key: '4' },
];

export default function Training() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollX = new Animated.Value(0);

  return (
    <View className='flex-1 items-center justify-center'>
      <StatusBar style="light" backgroundColor='#080835' />

      <Image source={require('@/assets/images/loginBg.png')} className='absolute -top-20 left-0 w-full ' resizeMode='stretch'  />

      <Animated.FlatList
        data={data}
        horizontal
        style={styles.listContent}
        renderItem={({ item, index }) => {
          const isFocused = index === focusedIndex;
          return (
            <ImageBackground style={[styles.card, isFocused && styles.focusedCard]} source={require('@/assets/images/bg-training.png')} resizeMode='stretch'>
              <Text style={styles.cardText}>{`Card ${item.key}`}</Text>
            </ImageBackground>
          );
        }}
        keyExtractor={item => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2, }}
        snapToInterval={CARD_WIDTH + 20} // largura do card + margem
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH + 20));
          setFocusedIndex(index);
        }}
      />
      <Button className='absolute bottom-7 bg-[#21175C] w-8/12' title='Iniciar'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a3d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    flexGrow: 0,
  },
  card: {
    width: CARD_WIDTH,
    height: 400,
    borderRadius: 20,
    marginHorizontal: 7.2,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0.9 }], // cards levemente menores por padrão
  },
  focusedCard: {
    transform: [{ scale: 1 }], // card em foco maior
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#2c2369',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

