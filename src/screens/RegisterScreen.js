// src/screens/RegisterScreen.js

// 1. Import 'useState' from React
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert, // We'll use this to show a message
} from 'react-native';

const RegisterScreen = ({ navigation }) => {
  // 2. Create state variables to hold the input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 3. Create a function to handle the sign-up button press
  const handleSignUp = () => {
    // For now, we'll just log the data to see if it works
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    // Later, we will send this data to our backend server!
    Alert.alert('Sign Up Pressed', `Name: ${name}, Email: ${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join the FuelGo community!</Text>

      {/* 4. Connect the state to the TextInputs */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#8F8F8F"
        value={name} // Display the 'name' state
        onChangeText={setName} // Update the 'name' state when text changes
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#8F8F8F"
        keyboardType="email-address"
        value={email} // Display the 'email' state
        onChangeText={setEmail} // Update the 'email' state
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8F8F8F"
        secureTextEntry={true}
        value={password} // Display the 'password' state
        onChangeText={setPassword} // Update the 'password' state
      />

      {/* 5. Call our handleSignUp function when the button is pressed */}
      <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
        <Text style={styles.registerButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={{fontWeight: 'bold'}}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Styles are unchanged
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
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
  registerButton: {
    backgroundColor: '#FFD700',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 25,
    fontSize: 14,
  },
});

export default RegisterScreen;
