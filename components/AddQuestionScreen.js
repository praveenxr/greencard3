import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const AddQuestionScreen = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [questionText, setQuestionText] = useState('');

  const handleAddQuestion = async () => {
    if (category.trim() === '' || questionText.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // API call to add a new question
      const response = await axios.post('https://webcruiser.in/greencard/q3.php', {
        category,
        question: questionText,
        action: 'addquestion', // Ensure this action is handled in your API
      });

      console.log('API Response:', response.data);

      // Assuming the API response contains a success message
      if (response.data.success) {
        Alert.alert('Success', 'Question added successfully');
        navigation.goBack(); // Go back to the previous screen
      } else {
        Alert.alert('Error', 'Failed to add question');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      Alert.alert('Error', 'An error occurred while adding the question');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />
      <Text style={styles.label}>Question</Text>
      <TextInput
        style={styles.textArea}
        value={questionText}
        onChangeText={setQuestionText}
        placeholder="Enter question"
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />
      <Button title="Add Question" onPress={handleAddQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
});

export default AddQuestionScreen;
