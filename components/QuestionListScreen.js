import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import axios from 'axios';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const QuestionListScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch questions function with cache-busting
  const fetchQuestions = async () => {
    try {
      const timestamp = new Date().getTime(); // Generate a unique timestamp
      const response = await axios.get(`https://webcruiser.in/greencard/q3.php?timestamp=${timestamp}`);
      setQuestions(response.data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch questions when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchQuestions();
    }, [])
  );

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchQuestions();
  };

  // Handle edit
  const onEdit = (question) => {
    navigation.navigate('EditQuestion', { question }); // Pass the question data
  };

  // Handle delete
  const onDelete = (question) => {
    Alert.alert(
      'Delete Question',
      'Are you sure you want to delete this question?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              // Assume there's an API endpoint for deletion
              const response = await axios.post('https://webcruiser.in/greencard/q3.php', { id: question.id, action: 'deletequestion' });
              console.log('API Response:', response.data);
              fetchQuestions(); // Refresh the list after deletion
            } catch (error) {
              console.error('Error deleting question:', error);
            }
          }
        }
      ]
    );
  };

  // Navigate to Add Question screen
  const onAddQuestion = () => {
    navigation.navigate('AddQuestion');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => onEdit(item)}> 
                <Ionicons name="pencil" size={24} color="#1dbf73" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(item)}>
                <Ionicons name="trash" size={24} color="#ff0000" />
              </TouchableOpacity>
            </View>
            <View style={styles.listItemContent}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.questionText}>{item.question}</Text>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      {/* Add Question Button */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={onAddQuestion}>
        <Ionicons name="add" size={25} color="#fff" />
      
      </TouchableOpacity>
    </View>
  );
};

export default QuestionListScreen;
