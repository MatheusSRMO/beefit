import Button from '@/components/button';
import Card from '@/components/card';
import MyCarousel from '@/components/carousel';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, ImageBackground, Image, Alert } from 'react-native';
import { AlunoContext } from '@/lib/aluno-context';
import Loading from '@/components/loading';
import VideoPlayer from '@/components/video-player';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 280;


export default function Training() {
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const scrollX = new Animated.Value(0);
  const [exerciseId, setExerciseId] = React.useState<number>();
  const aluno = React.useContext(AlunoContext);

  if (!aluno) {
    return (
      <View className='flex-1 w-full h-full flex justify-center items-center'>
        <Loading />
      </View>
    );
  }

  // console.log(aluno.treinos);
  const data = [...aluno.treinos[aluno.treinos.length - 1].exercicios, null];

  return (
    <View className='flex-1 items-center justify-center w-full relative'>

      <Image source={require('@/assets/images/loginBg.png')} className='absolute -top-20 -left-50 w-full ' resizeMode='stretch' />

      <Animated.FlatList
        data={data}
        horizontal
        style={styles.listContent}
        renderItem={({ item, index }) => {
          const isFocused = index === focusedIndex;

          return (
            <View>
              {item === null ? (
                <Card
                  isFocused={isFocused}
                  type={'end'}
                >
                  <Text className='text-white' style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto_400Regular',
                    fontSize: 16
                  }}>
                    Você ainda não completou todos {'\n'} os exercícios!
                  </Text>
                  <Button
                    title="Voltar aos exercícios"
                    className='bg-[#775FD1] w-[70%] px-2 py-3 mt-20'
                    onPress={() => {
                      router.push('./training');
                    }}
                  />
                  <Button
                    title="Finalizar"
                    className='bg-[#4F99DD] w-[70%] px-2 py-3 mt-5'
                    onPress={() => {
                      router.push('/');
                    }}
                  />
                </Card>
              ) : (
                <Card
                  isFocused={isFocused} 
                  type={'default'}>
                  <VideoPlayer uri={item.exercicio.gifLink}/>
                </Card>
                
              )}
            </View>


          );
        }}
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
      <Button
        className='absolute bottom-7 bg-[#4F99DD] w-8/12 p-2'
        title='Iniciar'
        onPress={() => {
          router.push({
            pathname: './exercises',
            params: { exercicio: focusedIndex },
          });
        }}
      />
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

