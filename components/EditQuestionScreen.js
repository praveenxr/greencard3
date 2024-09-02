import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EditQuestionScreen = ({ route }) => {
  const { question } = route.params; // Destructure the passed question data
  const [category, setCategory] = useState(question.category); // Pre-fill the category
  const [questionText, setQuestionText] = useState(question.question); // Pre-fill the question
  const [successMessage, setSuccessMessage] = useState(''); // State to manage success message
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error message

  const handleSave = async () => {
    try {
      // Send the updated question data to the backend via POST request
      const response = await axios.post('https://webcruiser.in/greencard/q3.php', {
        id: question.id,
        category:category,
        question: questionText,
		action:'editquestion',
      });

      // Log the response to the console
      console.log('API Response:', response.data);

      // Set success message
      setSuccessMessage('Question updated successfully!');
    } catch (error) {
      // Log the error and set the error message
      console.error('Error saving question:', error);
      setErrorMessage('Error saving question. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Question</Text>
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
      />
      <TextInput
        style={styles.textArea}
        value={questionText}
        onChangeText={setQuestionText}
        placeholder="Question"
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
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
  successMessage: {
    color: 'green',
    marginBottom: 20,
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default EditQuestionScreen;
