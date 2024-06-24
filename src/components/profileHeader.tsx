import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface ProfileHeaderProps {
  name: string;
  lastName: string;
  imageSource: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, lastName, imageSource }) => {
  const [image, setImage] = useState<string>(''); 
  const router = useRouter();

  const importImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageAsset = result.assets[0].uri;
      console.log('Image URI selecionado:', imageAsset); // Log da URI da imagem selecionada

      const newPath = FileSystem.documentDirectory + 'selectedImage.png';

      try {
        await FileSystem.copyAsync({
          from: imageAsset,
          to: newPath,
        });

        const fileInfo = await FileSystem.getInfoAsync(newPath);
        if (fileInfo.exists) {
          setImage(newPath);
          console.log('Imagem selecionada existe, navegando para ImagePreview'); // Log antes de navegar

          router.push({
            pathname: '/(auth)/imagePreview',
            params: {
              imageFile: newPath + '?' + new Date().getTime(), // Adiciona um timestamp para forçar atualização
            },
          });
        } else {
          console.log('Image file does not exist:', newPath);
          alert('A imagem selecionada não pôde ser carregada.');
        }
      } catch (error) {
        console.log('Erro ao copiar a imagem:', error);
        alert('Erro ao copiar a imagem selecionada.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={importImage} activeOpacity={0.7} style={styles.avatarContainer}>
        {/* Aqui você pode adicionar um ícone de câmera ou outra indicação visual */}
      </TouchableOpacity>

      {/* <Avatar source={{ uri: imageSource }} /> */}

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.nameText}>{lastName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingTop: 10,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#4F99DD',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    maxWidth: '100%',
    marginLeft: 10,
  },
  nameText: {
    color: '#FFDC98',
    fontSize: 24,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
});

export default ProfileHeader;
