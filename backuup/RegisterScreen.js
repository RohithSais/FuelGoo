// src/screens/RegisterScreen.js

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import api from '../services/api.js';

// Import our custom components
import CustomInput from '../components/components/CustomInput.js';
import CustomButton from '../components/components/CustomButton.js';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      await api.post('/api/users/register', { name, email, password });
      Alert.alert('Success!', 'You have been registered successfully. Please log in.');
      navigation.navigate('Login');
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      Alert.alert('Registration Failed', message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the FuelGo community today</Text>
      </View>

      <View style={styles.form}>
        <CustomInput
          iconName="account-outline"
          placeholder="Enter your Full Name"
          value={name}
          onChangeText={setName}
        />
        <CustomInput
          iconName="email-outline"
          placeholder="Enter your Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          iconName="lock-outline"
          placeholder="Create a Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton title="Sign Up" onPress={handleSignUp} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// The styles are nearly identical to LoginScreen for a consistent feel
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    color: '#FFFFFF',
    // fontFamily: 'Poppins-Bold', // Temporarily disabled
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    // fontFamily: 'Poppins-Regular',
  },
  form: {
    width: '100%',
  },
  loginText: {
    color: '#A0A0A0',
    textAlign: 'center',
    // fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  loginLink: {
    color: '#FFD700',
    // fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;