import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';

const HomeScreen = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const requestPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted', 'The app needs permission to use the camera.', [{ text: 'OK' }]);
    } else {
      setIsPermissionGranted(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      {isPermissionGranted ?
        <Text style={styles.message}>Camera permission granted</Text>
        :
        <TouchableOpacity style={styles.button} onPress={requestPermissions}>
          <Text style={styles.buttonText}>Start App</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3F51B5',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default HomeScreen;
