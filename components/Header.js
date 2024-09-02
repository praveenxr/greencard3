import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const Header = ({ navigation }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={30} color="black" />
    </TouchableOpacity>
    <Image
      source={require('../assets/applogo.png')}
      style={{ left: -30, width: 250, height: 50, resizeMode: 'contain' }}
    />
  </View>
);

export default Header;
