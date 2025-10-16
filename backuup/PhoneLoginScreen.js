// src/screens/PhoneLoginScreen.js

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import api from '../services/api.js';

import CustomInput from '../components/components/CustomInput.js';
import CustomButton from '../components/components/CustomButton.js';

const PhoneLoginScreen = ({ navigation }) => {
  // State for Firebase confirmation object
  const [confirm, setConfirm] = useState(null);

  // State for phone number and OTP code
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  
  // State to disable buttons during async operations
  const [loading, setLoading] = useState(false);

  // Function to send OTP to the user's phone
  const signInWithPhoneNumber = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number.');
      return;
    }
    setLoading(true);
    try {
      // IMPORTANT: Phone number must include country code (e.g., +91)
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      Alert.alert('OTP Sent!', 'Please check your messages.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send OTP. Please ensure the format is correct (e.g., +91 XXXXXXXXXX).');
    }
    setLoading(false);
  };

  // Function to verify the OTP and log the user in
  const confirmCode = async () => {
    if (!code) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }
    setLoading(true);
    try {
      // 1. Confirm the code with Firebase
      const userCredential = await confirm.confirm(code);
      if (userCredential) {
        // 2. Get the secure ID token from Firebase
        const idToken = await userCredential.user.getIdToken();
        
        // 3. Send the token to your backend
        const response = await api.post('/api/users/login-phone', { idToken, name: 'New User' });
        
        // 4. Store your app's token and navigate home
        await AsyncStorage.setItem('userToken', response.data.token);
        navigation.replace('Home');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'The code you entered is invalid.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>{!confirm ? 'Login with Phone' : 'Enter OTP'}</Text>
        <Text style={styles.subtitle}>
          {!confirm
            ? 'We will send you a confirmation code'
            : `A code has been sent to ${phoneNumber}`}
        </Text>
      </View>

      <View style={styles.form}>
        {!confirm ? (
          // Show phone number input view
          <>
            <CustomInput
              iconName="phone-outline"
              placeholder="Enter Phone (+91...)"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <CustomButton title="Send OTP" onPress={signInWithPhoneNumber} disabled={loading} />
          </>
        ) : (
          // Show OTP input view
          <>
            <CustomInput
              iconName="message-reply-text-outline"
              placeholder="Enter 6-digit OTP"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />
            <CustomButton title="Verify OTP" onPress={confirmCode} disabled={loading} />
          </>
        )}
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backLink}>Go Back to Email Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Use styles consistent with your other screens
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  backLink: {
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default PhoneLoginScreen;