import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed
import Header from './Header'; // Import the Header component

const FeedbackScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');
  const [email, setEmail] = React.useState(''); // New state for email

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim() || !email.trim()) {
      Alert.alert("Error", "Email and Feedback cannot be empty.");
      return;
    }

    try {
      const response = await fetch('https://webcruiser.in/greencard/q3.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback,
          email: email, // Send email to the API
          action: 'submitfeedback',
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);
      if (response.ok) {
        Alert.alert("Success", "Thank you for your feedback!");
      } else {
        Alert.alert("Error", "Failed to submit feedback. Please try again later.");
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "An error occurred while submitting feedback.");
    }

    setFeedback('');
    setEmail(''); // Clear the email input
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require('../assets/Splashscreen.png')} // Replace with your image URL or local path
      style={styles.background}
    >
      <Header navigation={navigation} />
      <View style={styles.feedbackScreenContainer}>

        {/* Feedback Button on Top Right */}
        <TouchableOpacity style={styles.feedbackButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="chatbubbles" size={24} color="white" />
        </TouchableOpacity>

        {/* Modal for Feedback Form */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.feedbackScreenModalContainer}>
            <View style={styles.feedbackScreenModalContent}>
              <Text style={styles.feedbackScreenModalTitle}>Your Feedback</Text>
              
              {/* Email Input */}
              <TextInput
                style={styles.feedbackScreenTextInput}
                placeholder="Your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              {/* Feedback Input */}
              <TextInput
                style={[styles.feedbackScreenTextInput, { height: 100 }]}
                placeholder="Type your feedback here"
                value={feedback}
                onChangeText={setFeedback}
                multiline
                textAlignVertical="top"
              />
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
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
    resizeMode: 'cover',
  },
  feedbackScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  feedbackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  feedbackScreenModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  feedbackScreenModalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  feedbackScreenModalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  feedbackScreenTextInput: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
