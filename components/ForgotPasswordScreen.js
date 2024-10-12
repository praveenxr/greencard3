import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios'; // Make sure axios is imported

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://webcruiser.in/greencard/q3.php', {
        action: 'forgot_password',
        email: email,
      });

      const result = response.data; // Axios automatically parses the JSON
      setLoading(false);

      if (result.success) {
        Alert.alert('Success', 'New temporary password generated and sent to your email. You can log in with that password and reset your new password.');
        navigation.navigate('LoginScreen'); // Navigate back to login after success
      } else {
        Alert.alert('Error', result.message || 'Failed to generate temporary password.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        title={loading ? 'Processing...' : 'Send Temporary Password'}
        onPress={handleForgotPassword}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ForgotPasswordScreen;
