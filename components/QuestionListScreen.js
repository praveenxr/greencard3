import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, Alert, TextInput } from 'react-native';
import axios from 'axios';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Header from './Header'; // Import the Header component

const QuestionListScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [debouncedQuery, setDebouncedQuery] = useState(''); // Debounced search query
  const [flatListLoading, setFlatListLoading] = useState(false); // State for FlatList loading

  // Debounce effect to update search query after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery); // Only set debouncedQuery after delay
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler); // Clear timeout if user types again
    };
  }, [searchQuery]);

  const fetchQuestions = async (query = '') => {
    try {
      setFlatListLoading(true); // Show loading for FlatList only
      const timestamp = new Date().getTime(); // Generate a unique timestamp
      const url = `https://webcruiser.in/greencard/q3.php?timestamp=${timestamp}&search=${query}`;
      console.log('Fetching URL:', url); // Log URL for debugging
      const response = await axios.get(url);

      // Check if the response contains a "message" with "No questions found"
      if (response.data.message === "No questions found") {
        setQuestions("No questions found"); // Set questions state to this message
      } else {
        setQuestions(response.data); // Set questions to the data if found
      }

      setFlatListLoading(false); // Hide loading for FlatList
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setFlatListLoading(false); // Hide loading on error
      setRefreshing(false);
    }
  };

  // Fetch questions when debouncedQuery changes
  useFocusEffect(
    useCallback(() => {
      fetchQuestions(debouncedQuery);
    }, [debouncedQuery])
  );

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchQuestions(debouncedQuery);
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
              const response = await axios.post('https://webcruiser.in/greencard/q3.php', { id: question.id, action: 'deletequestion' });
              console.log('API Response:', response.data);
              fetchQuestions(debouncedQuery); // Refresh the list after deletion
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

  return (
    <View style={{ flex: 1 }}>
      {/* Display the custom header */}
      <Header navigation={navigation} />

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search questions..."
          value={searchQuery}
          onChangeText={setSearchQuery} // Update searchQuery on text change
        />
        <TouchableOpacity onPress={() => fetchQuestions(debouncedQuery)} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* FlatList for displaying questions or no questions found */}
      {flatListLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : questions === "No questions found" ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No questions found</Text>
        </View>
      ) : (
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
            
              <TouchableOpacity onPress={() => navigation.navigate('QuestionDetail', { question: item })}>
                <View style={styles.listItemContent}>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.listQuestionText}>
                    {item.question.length > 50 ? `${item.question.substring(0, 60)}...` : item.question}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

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
