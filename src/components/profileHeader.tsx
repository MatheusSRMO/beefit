import React, { useEffect, useId, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-expo";


interface Aluno {
  id: number;
  firstName: string;
  lastName: string;
  url: string;
}

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  url: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ firstName, lastName, url }) => {
  const [image, setImage] = useState<string>(url); 
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
      console.log('Image URI selecionado:', imageAsset);

      const newPath = FileSystem.documentDirectory + 'selectedImage.png';

      try {
        await FileSystem.copyAsync({
          from: imageAsset,
          to: newPath,
        });

        const fileInfo = await FileSystem.getInfoAsync(newPath);
        if (fileInfo.exists) {
          setImage(newPath);
          console.log('Imagem selecionada existe, navegando para ImagePreview');

          router.push({
            pathname: '/(auth)/imagePreview',
            params: {
              imageFile: newPath + '?' + new Date().getTime(),
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
      <TouchableOpacity activeOpacity={0.7} style={styles.avatarContainer}>
        <Image source={{ uri: image }} style={styles.avatar} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{firstName}</Text>
        <Text style={styles.nameText}>{lastName}</Text>
      </View>
    </View>
  );
};

const App: React.FC = () => {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { userId } = useAuth();

  const url = `https://beefit-admin.vercel.app/api/aluno/${userId}`;
  console.log(url);
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`https://beefit-admin.vercel.app/api/aluno/${userId}`);
  //       const { body } = response.data;
  //       setAluno(body); 
  //       setLoading(false);
  //       // console.log('Data fetched:', response);
  //     } catch (error: any) {
  //       setError(error);
  //       setLoading(false);
  //       if (!error.response) {
  //         console.error('Network error:', error);
  //         Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor. Verifique sua conexão de internet.');
  //       } else {
  //         console.error('Error response:', error.response);
  //         Alert.alert('Erro', `Erro ao buscar dados: ${error.response.statusText}`);
  //       }
  //     }
  //   };

  //   if(userId)  fetchData();
  // }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Erro ao carregar dados: {error.message}</Text>;
  }

  return (
    <ProfileHeader 
      firstName={aluno?.firstName || ""} 
      lastName={aluno?.lastName || ""} 
      url={aluno?.url || ""} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingTop: 40,
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
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
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

export default App;
