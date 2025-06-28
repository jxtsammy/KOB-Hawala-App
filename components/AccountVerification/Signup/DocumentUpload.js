import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Image,
  Modal,
  Alert
} from 'react-native';
import { 
  Upload, 
  ArrowLeft, 
  Headphones, 
  X, 
  Clock, 
  Signal,
  AlertTriangle
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadDocumentScreen = ({ navigation }) => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [currentUploadSide, setCurrentUploadSide] = useState(null);

  // Function to pick an image from gallery
  const pickImage = async (side) => {
    setCurrentUploadSide(side);
    
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }
    
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      // Simulate ID card validation (in a real app, you'd have actual validation)
      const isValidIDCard = Math.random() > 0.3; // 70% chance of success for demo
      
      if (isValidIDCard) {
        if (side === 'front') {
          setFrontImage(result.assets[0].uri);
        } else {
          setBackImage(result.assets[0].uri);
        }
      } else {
        // Show error modal if validation fails
        setErrorModalVisible(true);
      }
    }
  };

  // Function to take a picture with camera
  const takePicture = async (side) => {
    setCurrentUploadSide(side);
    
    // Request permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your camera');
      return;
    }
    
    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      // Simulate ID card validation (in a real app, you'd have actual validation)
      const isValidIDCard = Math.random() > 0.3; // 70% chance of success for demo
      
      if (isValidIDCard) {
        if (side === 'front') {
          setFrontImage(result.assets[0].uri);
        } else {
          setBackImage(result.assets[0].uri);
        }
      } else {
        // Show error modal if validation fails
        setErrorModalVisible(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1e25" />
      
      {/* Navigation Icons */}
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Yellow Line */}
      <View style={styles.yellowLine} />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Upload your ID document</Text>
        
        {/* Front side upload area */}
        <View style={styles.uploadContainer}>
          {frontImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: frontImage }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.reuploadButton}
                onPress={() => pickImage('front')}
              >
                <Upload size={20} color="#1a1e25" />
                <Text style={styles.reuploadText}>Reupload</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.uploadArea}
              onPress={() => pickImage('front')}
            >
              <Upload size={24} color="#ffd60a" />
              <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.uploadLabel}>Back side of ID Card</Text>
        
        {/* Back side upload area */}
        <View style={styles.uploadContainer}>
          {backImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: backImage }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.reuploadButton}
                onPress={() => pickImage('back')}
              >
                <Upload size={20} color="#1a1e25" />
                <Text style={styles.reuploadText}>Reupload</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.uploadArea}
              onPress={() => pickImage('back')}
            >
              <Upload size={24} color="#ffd60a" />
              <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <TouchableOpacity 
        style={[
          styles.continueButton,
          (!frontImage || !backImage) && styles.disabledButton
        ]} 
        onPress={() => {
          if (frontImage && backImage) {
            Alert.alert('Success', 'Documents uploaded successfully!');
            navigation?.navigate('LivenessCheck');
          } else {
            Alert.alert('Error', 'Please upload both sides of your ID card');
          }
        }}
        disabled={!frontImage || !backImage}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      
      {/* Error Modal */}
      <Modal
        visible={errorModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.errorModalContainer}>
          <View style={styles.errorModalContent}>
            <View style={styles.errorIconContainer}>
              <AlertTriangle size={24} color="#1a1e25" />
            </View>
            
            <Text style={styles.errorModalText}>
              The image you uploaded doesn't meet the requirements. If you continue to submit it, the verification may fail. Please re-upload it
            </Text>
            
            <TouchableOpacity 
              style={styles.errorPrimaryButton}
              onPress={() => {
                setErrorModalVisible(false);
                // Re-trigger the image picker
                setTimeout(() => {
                  pickImage(currentUploadSide);
                }, 500);
              }}
            >
              <Text style={styles.errorPrimaryButtonText}>Reupload</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.errorSecondaryButton}
              onPress={() => navigation.navigate('LivenessCheck')}
            >
              <Text style={styles.errorSecondaryButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  yellowLine: {
    height: 3,
    width: '75%',
    backgroundColor: '#ffd60a',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  uploadLabel: {
    color: '#9ca3af',
    fontSize: 18,
    marginBottom: 15,
  },
  uploadArea: {
    height: 200,
    backgroundColor: '#272b33',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3a3f4b',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: '#ffd60a',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  reuploadButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ffd60a',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reuploadText: {
    color: '#1a1e25',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  continueButton: {
    backgroundColor: '#ffd60a',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 20,
  },
  disabledButton: {
    backgroundColor: '#8c7d30',
  },
  continueText: {
    color: '#1a1e25',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorModalContent: {
    backgroundColor: '#272b33',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  errorIconContainer: {
    backgroundColor: '#ffd60a',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorModalText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorPrimaryButton: {
    backgroundColor: '#ffd60a',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorPrimaryButtonText: {
    color: '#1a1e25',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorSecondaryButton: {
    backgroundColor: '#3a3f4b',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  errorSecondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadDocumentScreen;