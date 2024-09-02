import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpScreen = () => (
  <View style={styles.centeredView}>
    <Text style={styles.helpText}>Need help? Here are some resources you can use:</Text>
    {/* Add more content or resources here */}
  </View>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  helpText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
});

export default HelpScreen;
