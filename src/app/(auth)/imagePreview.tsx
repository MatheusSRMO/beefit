import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';

export default function ImagePreview() {
  const { imageFile } = useLocalSearchParams();
  const [fileExists, setFileExists] = useState(false);

  useEffect(() => {
    const checkFileExists = async (uri: string) => {
      try {
        console.log('Verificando URI:', uri); // Log da URI
        const fileInfo = await FileSystem.getInfoAsync(uri);
        console.log('Informações do arquivo:', fileInfo); // Log das informações do arquivo
        return fileInfo.exists;
      } catch (error) {
        console.log('Erro ao verificar arquivo:', error);
        return false;
      }
    };

    const verifyAndSetFileExists = async () => {
      console.log('Valor de imageFile no início:', imageFile); // Log do valor de imageFile

      if (typeof imageFile === 'string' && imageFile !== '') {
        try {
          const exists = await checkFileExists(imageFile);
          console.log('Arquivo existe:', exists); // Log se o arquivo existe
          setFileExists(exists);
        } catch (error) {
          console.log('Erro ao verificar arquivo:', error);
          setFileExists(false);
        }
      } else {
        console.log('imageFile é inválido ou vazio:', imageFile); // Log se imageFile é inválido ou vazio
        setFileExists(false);
      }
    };

    verifyAndSetFileExists();
  }, [imageFile]);




  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <TouchableOpacity
        style={styles.closeBtn}
        activeOpacity={ 0.8 }
        onPress={() => {
          router.back()
        }}
      >
          <AntDesign name='close' size={22} color='#fff'/>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {/* if (fileExists) ( */}
          <Image
            style={styles.image}
            source={{ uri: imageFile as string}}
            resizeMode="center"
            onError={(error) => {
              console.log('Error loading image:', error.nativeEvent.error);
              alert('Erro ao carregar a imagem.');
            }}
            onLoad={() => console.log('Image loaded successfully')}
          />
        {/* )  */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '65%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    width: 45,
    height: 45, 
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    top: 30,
    backgroundColor: "#fff1",
  },

});
