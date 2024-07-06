import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Image } from 'react-native';
import Button from '@/components/button';
import Card from '@/components/card';
import { router, useLocalSearchParams } from 'expo-router';
import { AlunoContext } from '@/lib/aluno-context';
import Loading from '../(public)/loading';
import VideoPlayer from '@/components/video-player';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 280;

export default function Exercises() {
  const scrollX = new Animated.Value(0);
  const { exercicio } = useLocalSearchParams();
  const [focusedIndex, setFocusedIndex] = useState(Number(exercicio));
  const aluno = React.useContext(AlunoContext);

  if (!aluno) {
    return (
      <View className='flex-1 w-full h-full flex justify-center items-center'>
        <Loading />
      </View>
    );
  }

  console.log(Number(exercicio))

  const data = [...aluno.treinos[aluno.treinos.length - 1].exercicios, null];
  let exercise: any = null;


  return (
    <View className='flex-1 items-center justify-center'>
      <Image source={require('@/assets/images/loginBg.png')} className='absolute -top-20 left-0 w-full' resizeMode='stretch' />

      <Animated.FlatList
        data={data}
        horizontal
        style={styles.listContent}
        renderItem={({ item, index }) => {
          const isLastItem = index === data.length - 1;
          if (item != null) exercise = item;

          return (
            <View style={{ marginTop: 5 }}>
              {Number(exercicio) === index && item !== null ? (
                <Card className='justify-center items-center' isFocused={false} type={'default'}>
                  <VideoPlayer uri={exercise.exercicio.gifLink} />
                </Card>
              ) : null}

              {item === null ? (
                <Card isFocused={false} type={'description'}>
                  <View className='bg-[#775FD1] w-[90%] left-4 pl-3 py-3 rounded-3xl mt-5'>
                    <Text className='text-white' style={{ fontFamily: 'Roboto_500Medium', fontSize: 20 }}>
                      {exercise.exercicio.nome}
                    </Text>
                  </View>
                  <Text className='text-white mt-3' style={{ left: 20, fontFamily: 'Roboto_400Regular', fontSize: 16 }}>
                    {exercise.exercicio.series} séries | {exercise.exercicio.repeticoes} repetições {'\n'}carga: {exercise.exercicio.peso} kg
                  </Text>
                </Card>
              ) : null}
            </View>
          );
        }}
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

      <Button className='absolute bottom-7 bg-[#4F99DD] w-8/12 p-2' title='Finalizar' onPress={() => {
        router.back();
      }} />
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
    transform: [{ scale: 0.9 }],
  },
  focusedCard: {
    transform: [{ scale: 1 }],
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
