// src/screens/LoginScreen.js

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api.js';

// We'll import the components again
import CustomInput from '../components/components/CustomInput.js';
import CustomButton from '../components/components/CustomButton.js';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Failed', 'Please enter both email and password.');
      return;
    }
    try {
      const response = await api.post('/api/users/login', { email, password });
      await AsyncStorage.setItem('userToken', response.data.token);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue your journey</Text>
      </View>

      <View style={styles.form}>
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
          placeholder="Enter your Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton title="Login" onPress={handleLogin} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
    fontWeight: 'bold', // Use system bold for now
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    // fontFamily: 'Poppins-Regular', // Temporarily disabled
  },
  form: {
    width: '100%',
  },
  signupText: {
    color: '#A0A0A0',
    textAlign: 'center',
    // fontFamily: 'Poppins-Regular', // Temporarily disabled
    fontSize: 14,
  },
  signupLink: {
    color: '#FFD700',
    // fontFamily: 'Poppins-Bold', // Temporarily disabled
    fontWeight: 'bold', // Use system bold for now
  },
});

export default LoginScreen;