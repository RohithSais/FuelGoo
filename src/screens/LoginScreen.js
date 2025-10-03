// src/screens/LoginScreen.js

import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

// The { navigation } prop is correctly added here
const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>FuelGo</Text>
      <Text style={styles.subtitle}>Welcome back! Please log in.</Text>

      {/* Email Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor="#8F8F8F"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        placeholderTextColor="#8F8F8F"
        secureTextEntry={true} // This hides the password
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* The onPress handler is correctly added here */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={{fontWeight: 'bold'}}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  loginButton: {
    backgroundColor: '#FFD700',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 14,
  },
});

export default LoginScreen;
