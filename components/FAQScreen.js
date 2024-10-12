import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './Header'; // Import your Header component

const FAQScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    if (modalVisible) {
      fetchFAQs();
    }
  }, [modalVisible]);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('https://webcruiser.in/greencard/q3.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'listfaqs',
        }),
      });

      const data = await response.json();
      console.log('FAQ Data:', data);
      setFaqList(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((itemId) => itemId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const renderFAQItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.faqItem}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{item.question}</Text>
        <Ionicons
          name={expandedIds.includes(item.id) ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="gray"
        />
      </View>
      {expandedIds.includes(item.id) && <Text style={styles.answerText}>{item.answer}</Text>}
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/Splashscreen.png')} // Replace with your image URL or local path
      style={styles.background}
    >
      {/* Pass navigation to Header */}
      <Header navigation={navigation} />

      <View style={styles.container}>
        {/* FAQ Button on Top Right */}
        <TouchableOpacity style={styles.faqButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="help-circle" size={24} color="white" />
        </TouchableOpacity>

        {/* Modal for FAQ List */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Frequently Asked Questions</Text>
              <FlatList
                data={faqList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderFAQItem}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Optional: Adjust how the image is displayed
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  faqButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  answerText: {
    fontSize: 14,
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FAQScreen;
