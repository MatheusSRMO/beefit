import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Image, Alert } from 'react-native';
import Button from '@/components/button';
import Card from '@/components/card';
import MyCarousel from '@/components/carousel';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 280;

const data = [
  { key: '1', random: 1 },
  { key: '2', random: 1 },
];

interface Exercise {
  id: number;
  nome: string;
  gifLink: string;
}

export default function Exercises() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollX = new Animated.Value(0);
  const { exercicio } = useLocalSearchParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/treino/a?id=${exercicio}`);
        const { body } = response.data;
        setExercise(body); 
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
  }, [exercicio]); 

    
  
  return (
    <View className='flex-1 items-center justify-center'>

      <Image source={require('@/assets/images/loginBg.png')} className='absolute -top-20 left-0 w-full' resizeMode='stretch' />
      
      <Animated.FlatList
        key={exercise?.id}
        data={[
          { nome: exercise?.nome, link: exercise?.gifLink, type: 'default' }, 
          { nome: exercise?.nome, link: exercise?.gifLink, type: 'description' }]}
        horizontal
        style={styles.listContent}
        renderItem={({ item }) => {

          return (
            <View style={{ marginTop: 5 }}>
              { item.type === 'default' ? (
                <Card isFocused={false} type={'default'}> 
                  <MyCarousel
                    image1={{ source: { uri: item.link } }}
                  />
                </Card> 
              ) : (
                <Card isFocused={false} type={'description'}> 
                  <View className='bg-[#775FD1] w-[90%] left-4 pl-3 py-3 rounded-3xl mt-5'>
                    <Text className='text-white' style={{
                      fontFamily: 'Roboto_500Medium',
                      fontSize: 20}}>
                      {item.nome}
                    </Text> 
                  </View>
                  <Text className='text-white mt-3 justify-ent bottom-0' style={{
                    left: 20,
                    fontFamily: 'Roboto_400Regular',
                    fontSize: 16}}>
                    3 séries | 8 a 12 repetições {'\n'}carga: 10 kg
                  </Text>
                </Card> 
              )}   
            </View>
          );
        }}
        // keyExtractor={item => item.key}
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
