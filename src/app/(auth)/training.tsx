import Button from '@/components/button';
import Card from '@/components/card';
import MyCarousel from '@/components/carousel';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, ImageBackground, Image } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 280;

const data = [
  { key: '1', random: 1 },
  { key: '2', random: 2 },
  { key: '3', random: 3 },
  { key: '4', random: 0 },
  
];

export default function Training() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [numExercises, setNumExercises] = useState(0);
  const scrollX = new Animated.Value(0);


  useEffect(() => {
    if (focusedIndex < data.length) {
      setNumExercises(data[focusedIndex].random);
    }
  }, [focusedIndex]);


  return (
    <View className='flex-1 items-center justify-center'>

      <Image source={require('@/assets/images/loginBg.png')} className='absolute -top-20 left-0 w-full ' resizeMode='stretch' />

      <Animated.FlatList
        data={data}
        horizontal
        style={styles.listContent}
        renderItem={({ item, index }) => {
          const random = item.random;
          const isFocused = index === focusedIndex;

          return (
            <View>
              { random === 0 ? (
                <Card isFocused={isFocused} group={1} type={'end'} className='items-center align-center justify-center'>
                  <Text className='text-white' style={{
                      textAlign: 'center',
                      fontFamily: 'Roboto_400Regular',
                      fontSize: 16}}>
                      Você ainda não completou todos {'\n'} os exercícios!
                  </Text>
                  <Button
                    title="Voltar aos exercícios"
                    className='bg-[#775FD1] w-[50%] w-[70%] px-2 py-3 mt-20'
                    onPress={() => {
                      router.push('./training');
                    }}
                  />
                  <Button
                    title="Finalizar"
                    className='bg-[#4F99DD] w-[70%] px-2 py-3 mt-5'
                    onPress={() => {
                      router.back();
                    }}
                  />
                </Card>
              ) : (
                <Card isFocused={isFocused} group={1} type={'default'}>
                  {random === 1 && (
                    <MyCarousel
                      image1={{ source: require('@/assets/gifs/exercicio1_animated.gif') }}
                    />
                  )}
                  {random === 2 && (
                    <MyCarousel
                      image1={{ source: require('@/assets/gifs/exercicio1_animated.gif') }}
                      image2={{ source: require('@/assets/gifs/exercicio2_animated.gif') }}
                    />
                  )}
                  {random === 3 && (
                    <MyCarousel
                      image1={{ source: require('@/assets/gifs/exercicio1_animated.gif') }}
                      image2={{ source: require('@/assets/gifs/exercicio2_animated.gif') }}
                      image3={{ source: require('@/assets/gifs/exercicio3_animated.gif') }}
                    />
                  )}
                </Card>
              )}

            </View>
            
            
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
          setLastIndex(index-1);
        }}
      />
      {numExercises !== 0 && (
        <Button
          className='absolute bottom-7 bg-[#4F99DD] w-8/12 p-2'
          title='Iniciar'
          onPress={() => {
            router.push({
              pathname: './exercises',
              params: { numExercises },
            });
          }}
        />
      )}
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
    // backgroundColor: '#90CAFF',
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

