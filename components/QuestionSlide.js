import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const QuestionSlide = ({ item }) => (
  <View style={styles.slide}>
    <Text style={styles.category}>{item.category}</Text>
    <Text style={styles.questionText}>{item.question}</Text>
  </View>
);

export default QuestionSlide;
