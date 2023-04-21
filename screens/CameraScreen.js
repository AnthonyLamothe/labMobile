import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const CameraScreen = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setIsPermissionGranted(status === 'granted');
    })();
  }, []);

  const onZoomIn = () => {
    if (cameraRef && zoom < 1) {
      setZoom(zoom + 0.5);
    }
  };

  const onZoomOut = () => {
    if (cameraRef && zoom > 0) {
      setZoom(zoom - 0.5);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setImageUri(uri);
  
      let downloadPath = `${FileSystem.documentDirectory}Download/${uri.split('/').pop()}`;
      await FileSystem.copyAsync({ from: uri, to: downloadPath });
  
      Alert.alert(
        'Photo prise!',
        'La photo a été sauvegardé ici : ' + downloadPath,
        [
          {
            text: 'OK',
            onPress: () => setImageUri(null)
          },
        ],
        { cancelable: false }
      );
    }
  };

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
    );
  };

  if (isPermissionGranted === null || isPermissionGranted === false) {
    return <View />;
  }
  else {
    return (
        <SafeAreaView style={styles.container}>
        <Camera 
          ref={ref => setCameraRef(ref)}
          style={styles.camera}
          type={cameraType}
          autoFocus={Camera.Constants.AutoFocus.on}
          flashMode={Camera.Constants.FlashMode.off}
          zoom={zoom}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>SNAP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={flipCamera}>
            <Text style={styles.buttonText}>FLIP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onZoomIn}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onZoomOut}>
            <Text style={styles.buttonText}>-</Text>
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
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'white',
      borderRadius: 50,
      width: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
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
