import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../design/CustomButton';
import CameraPng from '../png/Camera.png';
import CameraClosePng from '../png/Camera_close.png';
import NavBar from '../design/NavBar';

const ImageSelection = ({ navigation, route }) => {
  const [images, setImages] = useState([]);
  const [camera, setCamera] = useState(null);
  const [startCamera, setStartCamera] = useState(false);

  const getPermissionAsync = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

    if (cameraStatus !== 'granted') {
      Alert.alert('Permission to access camera and gallery is required!');
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.uri]);
    }
  };

  const takePhoto = async () => {
    if (camera) {
      const result = await camera.takePictureAsync();
      setImages((prevImages) => [...prevImages, result.uri]);
      handleStopCamera();
    }
  };

  const handleStartCamera = () => {
    setStartCamera(true);
  };

  const handleStopCamera = () => {
    setStartCamera(false);
  };

  const handleContinue = () => {
    navigation.navigate('ResultsScreen', { images, feature: route.params.feature });
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(ref) => setCamera(ref)}>
          <View style={styles.button_container}>
            <TouchableOpacity style={styles.cameraButtonContainer} onPress={takePhoto}>
              <Image source={CameraPng} style={{ width: 90, height: 90 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButtonContainer} onPress={handleStopCamera}>
              <Image source={CameraClosePng} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <>
          {images.length > 0 ? (
            <View style={styles.imageContainer}>
              {images.map((imageUri, index) => (
                <Image key={index} source={{ uri: imageUri }} style={styles.image} />
              ))}
            </View>
          ) : null}
          <View style={styles.buttonContainer}>
            <CustomButton label={"Pick an image from the gallery"} onPress={pickImage} />
            <CustomButton label={"Take a photo"} onPress={handleStartCamera} />
          </View>
          {images.length > 0 && (
            <CustomButton label={"Continue"} onPress={handleContinue} />
          )}
        </>
      )}
      {!startCamera && <NavBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
  },
  camera: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  buttonContainer: {
    flexGrow: 1,           
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  button_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  cameraButtonContainer: {
    alignItems: 'center',
    marginLeft: 70,
  },
  closeButtonContainer: {
    marginLeft: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default ImageSelection;