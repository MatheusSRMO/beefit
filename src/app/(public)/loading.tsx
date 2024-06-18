import { Animated, Easing, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import LoadingC from '@/components/loading'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/FontAwesome'; // ou qualquer outro ícone que você prefira

// export default function Loading() {
//   return (
//     <View className='w-full h-full bg-[#006895]'>
//       <StatusBar style="light" backgroundColor='#528AA5' />
//       <LoadingC />
//     </View>
    
//   )
// }


const LoadingSpinner = () => {
  const animatedValues = Array.from({ length: 20 }, () => new Animated.Value(0));

  useEffect(() => {
    // Animação dos pontos
    animatedValues.forEach((value, index) => {
      Animated.loop(
        Animated.timing(value, {
          toValue: 1,
          duration: 2000,
          delay: index * 100,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    });
  }, []);

  return (
    <View className='flex justify-center items-center w-full h-full bg-[#006895]'>
      <View style={styles.dashedCircle}>
        {animatedValues.map((value, index) => {
          const scale = value.interpolate({
            inputRange: [0, 0.1, 0.8, 1],
            outputRange: [0, 1.2, 0, 0],
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.dash,
                {
                  transform: [
                    { rotate: `${index * 18}deg` },
                    { translateY: -55 },
                    { scale },
                  ],
                },
              ]}
            />
          );
        })}

        <Icon name="rocket" size={30} color="#FFDC98" style={styles.icon} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  dashedCircle: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  dash: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#FFDC98',
    borderRadius: 5,
    top: 0,
    left: 0,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15,
  },
});

export default LoadingSpinner;
