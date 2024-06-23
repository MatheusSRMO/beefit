import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ImagePreview() {
  const { imageFile } = useLocalSearchParams();

  console.log('imageFile:', imageFile);
  const testUri = 'src/assets/images/abelha1.png';

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.imageContainer}>
        {typeof imageFile === 'string' && imageFile !== '' ? (
          <Image
            style={styles.image}
            source={{ uri: imageFile }}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.debugText}>No Image Available</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: '100%',
    height: '100%',
  },
  debugText: {
    fontSize: 20,
    color: 'red',
  },
});
