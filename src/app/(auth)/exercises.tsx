import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Image } from 'react-native';
import Button from '@/components/button';
import Card from '@/components/card';
import MyCarousel from '@/components/carousel';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';
import { router, useLocalSearchParams } from 'expo-router';


const { width } = Dimensions.get('window');
const CARD_WIDTH = 280;

const data = [
  { key: '1', random: 1 },
  { key: '2', random: 1 },
];

export default function Exercises() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollX = new Animated.Value(0);
  const { numExercises } = useLocalSearchParams();

  const numCards = typeof numExercises === 'string' ? parseInt(numExercises) : 1;
  console.log(numCards);

  // Array de quantidade de carrosséis baseado em numExercises
  const carousels = Array.from({ length: numCards }, (_, index) => (
    <Animated.FlatList
      key={index.toString()}
      data={data}
      horizontal
      style={styles.listContent}
      renderItem={({ item, index }) => {
        const random = item.random;
        const type = index === 0 ? 'default' : 'exercise';
        return (
          <View style={{ marginTop: 5 }}>
              <Card isFocused={false} group={numCards} type={type} />           
          </View>
        );
      }}
      keyExtractor={item => item.key}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2 }}
      snapToInterval={CARD_WIDTH + 20}
      decelerationRate="fast"
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
      onMomentumScrollEnd={event => {
        const index = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH + 20));
        setFocusedIndex(index);
      }}
    />
  ));
  
  return (
    <View className='flex-1 items-center justify-center'>

      <Image source={require('@/assets/images/loginBg.png')} className='absolute -top-20 left-0 w-full' resizeMode='stretch' />
      {carousels}
      <Button 
        className='absolute bottom-7 bg-[#4F99DD] w-8/12 p-2' 
        title='Finalizar' 
        onPress={() => {
          router.back();
        }}/>
    </View>
  );
}

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
    height: 200,
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
