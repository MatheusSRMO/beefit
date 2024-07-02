import Button from '@/components/button';
import Card from '@/components/card';
import MyCarousel from '@/components/carousel';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, ImageBackground, Image, Alert } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 280;

const dataset = [
  { key: '1', random: 1 },
  { key: '2', random: 2 },
  { key: '3', random: 3 },
  { key: '4', random: 0 },
];

interface Treino {
  id: number;
  exercicios: number[];
  aluno_id: number;
}

export default function Training() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  // const [numExercises, setNumExercises] = useState(0);
  // const [number, setNumber] = useState(1);
  const scrollX = new Animated.Value(0);
  const [treinos, setTreinos] = useState<Treino[]>([]);
  // const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [alunoId, setAlunoId] = useState<number | null>(null);
  const [exerciseId, setExerciseId] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      if (alunoId === null) {
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`http://192.168.0.112:3000/api/aluno/treino/a?aluno_id=${alunoId}`);
        const { body } = response.data;
        setTreinos(body); 
        setLoading(false);
        console.log('Data fetched:', body);
      } catch (error: any) {
        setError(error);
        setLoading(false);
        if (!error.response) {
          console.error('Network error:', error);
          Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor. Verifique sua conexão de internet.');
        } else {
          console.error('Error response:', error.response);
          Alert.alert('Erro', `Erro ao buscar dados: ${error.response.statusText}`);
        }
      }
    };
  
    fetchData();
  }, [alunoId]); 

  const selectedTreino = treinos.find(treino => treino.id === 1);

  return (
    <View className='flex-1 items-center justify-center'>

      <Image source={require('@/assets/images/loginBg.png')} className='absolute -top-20 -left-50 w-full ' resizeMode='stretch' />

      <Animated.FlatList
        data={selectedTreino?.exercicios}
        horizontal
        style={styles.listContent}
        renderItem={({ item, index }) => {
          const isFocused = index === focusedIndex;
          setExerciseId(item);
          
          return (
            <View>
              { item === null ? (
                <Card isFocused={isFocused} type={'end'} className='items-center align-center justify-center'>
                  <Text className='text-white' style={{
                      textAlign: 'center',
                      fontFamily: 'Roboto_400Regular',
                      fontSize: 16}}>
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
                      router.back();
                    }}
                  />
                </Card>
              ) : (
                <Card isFocused={isFocused} type={'default'}>
                    <MyCarousel
                      image1={{ source: require('@/assets/gifs/exercicio1_animated.gif') }}
                    />
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
      {selectedTreino?.exercicios !== null && (
        <Button
          className='absolute bottom-7 bg-[#4F99DD] w-8/12 p-2'
          title='Iniciar'
          onPress={() => {
            router.push({
              pathname: './exercises',
              params: { exercicio: exerciseId },
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

