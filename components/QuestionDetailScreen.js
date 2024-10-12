import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuestionDetailScreen = ({ route }) => {
  const { question } = route.params; // Ensure question data is passed
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{question.category}</Text>
      <Text style={styles.questionText}>{question.question}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
  },
});

export default QuestionDetailScreen;
