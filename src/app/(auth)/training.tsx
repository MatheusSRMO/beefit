import Button from '@/components/button';
import Card from '@/components/card';
import { router } from 'expo-router';
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Image } from 'react-native';
import { AlunoContext } from '@/lib/aluno-context';
import Loading from '@/components/loading';
import VideoPlayer from '@/components/video-player';
import { TreinoContext } from '@/lib/treino-context';
import axios from 'axios';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 280;

export default function Training() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollX = new Animated.Value(0);
  const aluno  = useContext(AlunoContext);
  const { exercisesDone } = useContext(TreinoContext);

  if (!aluno) {
    return (
      <View className='flex-1 w-full h-full flex justify-center items-center'>
        <Loading />
      </View>
    );
  }

  const finalizarTreino = async () => {
    if (aluno) {
      try {
        const treinoId = aluno.treinos[aluno.treinos.length - 1].id;     
        const url = `https://beefit-admin.vercel.app/api/treino/${treinoId}`;
        console.log(url);
        const finalizado = await axios.put(url);
        console.log(finalizado.data);

      } catch (error) {
        console.error('Erro ao atualizar treino:', error);
      }
    }
  };


  const data = [...aluno.treinos[aluno.treinos.length - 1].exercicios, null];
  const isEndCard = data[focusedIndex] === null;

  return (
    <View className='flex-1 items-center justify-center w-full relative'>
      <Image source={require('@/assets/images/loginBg.png')} className='absolute -top-20 -left-50 w-full ' resizeMode='stretch' />

      <Animated.FlatList
        data={data}
        horizontal
        style={styles.listContent}
        renderItem={({ item, index }) => {
          const isFocused = index === focusedIndex;

          if (item === null && exercisesDone < aluno.treinos[aluno.treinos.length - 1].exercicios.length) {
            return (
              <Card isFocused={isFocused} type={'end'}>
                <Text className='text-white' style={{ textAlign: 'center', fontFamily: 'Roboto_400Regular', fontSize: 16 }}>
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
            );
          }

          if (item === null && exercisesDone >= aluno.treinos[aluno.treinos.length - 1].exercicios.length) {
            return (
              <Card isFocused={isFocused} type={'end'}>
                <Text className='text-white' style={{ textAlign: 'center', fontFamily: 'Roboto_400Regular', fontSize: 16 }}>
                  Você completou todos {'\n'} os exercícios!
                </Text>
                <Button
                  title="Finalizar"
                  className='bg-[#4F99DD] w-[70%] px-2 py-3 mt-5'
                  onPress={() => {
                    finalizarTreino();
                    router.push('/');
                  }}
                />
              </Card>
            );
          }

          if( item !== null ) {
            return (
              <Card isFocused={isFocused} type={'default'}>
                <VideoPlayer uri={item.exercicio.gifLink} />
              </Card>
            );
          }
          return null;
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2 }}
        snapToInterval={CARD_WIDTH + 20}
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

      {!isEndCard && (
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
      )}
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
    height: 400,
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
