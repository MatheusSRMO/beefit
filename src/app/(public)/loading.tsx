import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// const { width, height } = Dimensions.get('window');

const LoadingSpinner = () => {
  const animatedValues = Array.from({ length: 20 }, () => new Animated.Value(0));
  const rotateValue = new Animated.Value(0);

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

    // Animação de rotação
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        delay: 1,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['10deg', '370deg'],
  });

  return (
    <View className='flex items-center justify-center'>
      <View style={styles.dashedCircle}>
        {animatedValues.map((value, index) => {
          const scale = value.interpolate({
            inputRange: [0, 0.1, 0.8, 1],
            outputRange: [0, 1, 0, 0],
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
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

        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [
                { rotate },
                { translateY: -55},
                // { translateX: -20 },
              ],
            },
          ]}
        >
          <Icon name="rocket" size={30} color="#FFDC98" />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashedCircle: {
    width: 120,
    height: 120,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#FFDC98',
    borderRadius: 7.5,
    top: 0,
    left: 0,
  },
  iconContainer: {
    position: 'absolute',
    top: 80,
    left: 85,
  },
});

export default LoadingSpinner;
