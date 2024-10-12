import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const Header = ({ navigation }) => (
  <View style={[styles.header, { backgroundColor: '#333333', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }]}>
    <Image
      source={require('../assets/applogo.png')}
      style={{ width: 250, height: 50, resizeMode: 'contain' }}
    />
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ padding: 10 }}>
      <Ionicons name="menu" size={30} color="white" />
    </TouchableOpacity>
  </View>
);

export default Header;
