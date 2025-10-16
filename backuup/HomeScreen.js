// src/screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Alert, ActivityIndicator, PermissionsAndroid, StatusBar } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from "socket.io-client";

const COLORS = {
  background: '#F4F7F5',
  primary: '#007AFF',
  textDark: '#333333',
  textLight: '#777777',
  white: '#FFFFFF',
  success: '#28a745',
};

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  // --- THIS IS THE FIX. ALL STATE VARIABLES MUST BE DECLARED HERE ---
  const [order, setOrder] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Finding your location...');
  const [isLoading, setIsLoading] = useState(true);
  // --------------------------------------------------------------------

  useEffect(() => {
    const socket = io("http://10.0.2.2:5000");
    socket.on('connect', () => console.log('Connected to WebSocket server!'));
    socket.on('order_accepted', (acceptedOrder) => {
      if (order && acceptedOrder._id === order._id) {
        setStatusMessage("Your request has been accepted!\nHelp is on the way.");
      }
    });
    return () => socket.disconnect();
  }, [order]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      console.log("1. Starting location permission request...");
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'FuelGo Location Permission',
            message: 'FuelGo needs access to your location to find you.',
            buttonPositive: 'OK',
          },
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("2. Location permission GRANTED.");
          console.log("3. Attempting to get current position...");

          Geolocation.getCurrentPosition(
            (position) => {
              console.log("4. SUCCESS! Position found:", position);
              setLocation(position.coords);
              setIsLoading(false);
            },
            (error) => {
              console.log("4. FAILED! Geolocation error:", error.code, error.message);
              Alert.alert("Error", `Could not fetch location. Code: ${error.code}, Message: ${error.message}`);
              setIsLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );

        } else {
          console.log("2. Location permission DENIED.");
          Alert.alert("Permission Denied", "Location permission is required.");
          setIsLoading(false);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }, []);

  const handleRequestFuel = async () => {
    if (!location) {
      Alert.alert("Error", "Could not get your location. Please try again.");
      return;
    }
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await api.post('/api/orders', 
        { latitude: location.latitude, longitude: location.longitude },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrder(response.data);
      setStatusMessage("Request Sent!\nWaiting for a station to accept...");
    } catch (error) {
      Alert.alert("Error", "Could not send your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading && !location) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.statusText}>{statusMessage}</Text>
        </View>
      );
    }

    if (order) {
      return (
        <View style={styles.centered}>
          <Icon name="check-circle-outline" size={80} color={COLORS.success} />
          <Text style={styles.statusText}>{statusMessage}</Text>
        </View>
      );
    }
    
    if (location) {
      return (
        <>
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={"Your Location"}
              description={"We'll send help here!"}
            />
          </MapView>
          <View style={styles.bottomContainer}>
            <Text style={styles.addressText}>Your current location is locked.</Text>
            <TouchableOpacity style={styles.button} onPress={handleRequestFuel}>
              <Icon name="gas-station" size={24} color={COLORS.white} />
              <Text style={styles.buttonText}>Request Fuel Delivery</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        padding: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
        alignItems: 'center',
    },
    addressText: {
        fontSize: 16,
        color: COLORS.textLight,
        fontFamily: 'Poppins-Regular',
        marginBottom: 20,
    },
    button: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 12,
        width: '100%',
        gap: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
    },
    statusText: {
        fontSize: 20,
        color: COLORS.textDark,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        lineHeight: 30,
    },
});

export default HomeScreen;