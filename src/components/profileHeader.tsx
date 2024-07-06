import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Avatar from './avatar';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  url: string;
}

const ProfileHeader = ({ firstName, lastName, url }: ProfileHeaderProps) => (
  <View style={styles.container}>
    <Avatar source={{ uri: url }} />

    <View style={styles.textContainer}>
      <Text style={styles.nameText}>{firstName}</Text>
      <Text style={styles.nameText}>{lastName}</Text>
    </View>
  </View>
)


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

export default ProfileHeader;
