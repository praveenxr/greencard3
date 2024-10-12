import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Ensure correct import

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Access login function from context

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Make a POST request to your PHP API for login
      const response = await axios.post('https://webcruiser.in/greencard/q3.php', {
        action: 'login',
        username: email,
        password: password,
      });

      // Check if login is successful
      if (response.data.success) {
        login(); // Call login function from context
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Questions');
      } else {
        Alert.alert('Error', response.data.message || 'Login failed');
        console.error('Login error:', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to Forgot Password screen
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={handleLogin} color="#1dbf73" />
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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#1dbf73',
    textAlign: 'right',
    marginBottom: 20,
  },
});

export default LoginScreen;
