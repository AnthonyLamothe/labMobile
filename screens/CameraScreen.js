import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, Image } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setIsPermissionGranted(status === 'granted');
    })();
  }, []);


  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setImageUri(uri);
    }
  };

  if (isPermissionGranted === null) {
    return <View />;
  }
  else if (isPermissionGranted === false) {
    return (
      <View style={styles.container}>
        <Text>La permission d'accès à la caméra a été refusée</Text>
      </View>
    );
  }
  else {
    return (
        <SafeAreaView style={styles.container}>
        <Camera 
            ref={ref => setCameraRef(ref)}
            style={styles.camera}
            type={Camera.Constants.Type.back}
            autoFocus={Camera.Constants.AutoFocus.on}
            flashMode={Camera.Constants.FlashMode.off}
        />
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>SNAP</Text>
            </TouchableOpacity>
        </View>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
      aspectRatio: 1,
      width: '100%',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'white',
      borderRadius: 50,
      width: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 16,
    },
    image: {
      flex: 1,
      width: '100%',
      resizeMode: 'contain',
    },
  });

export default CameraScreen;
