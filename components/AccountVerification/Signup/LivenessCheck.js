// IDVerificationScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  ArrowLeft,
  X,
  Camera,
  Upload,
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const IDVerificationScreen = ({ navigation }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    startPulseAnimation();
    startRotateAnimation();
    startScaleAnimation();
    startFadeAnimation();
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startRotateAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  };

  const startScaleAnimation = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const startFadeAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
      return;
    }

    setIsUploading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    setIsUploading(false);
    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
      return;
    }

    setIsUploading(true);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    setIsUploading(false);
    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Upload ID Verification Photo',
      'Choose how you want to add your photo',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleContinue = () => {
    if (!uploadedImage) {
      Alert.alert('Photo Required', 'Please upload a photo of yourself holding your ID card before continuing.');
      return;
    }

    Alert.alert(
      'Verification Submitted',
      'Your ID verification photo has been submitted successfully. We will review it and notify you of the results.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('UnderReview'),
        },
      ]
    );
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
        <View style={styles.headerProgress}>
          <View style={styles.progressBar} />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* ScrollView for all content below header */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>ID Verification</Text>
          <Text style={styles.subtitle}>Hold your ID card to your chest</Text>
          
          {/* Moved animations and buttons here */}
          {!uploadedImage ? (
            <Animated.View style={[styles.uploadSection, { transform: [{ scale: scaleAnim }] }]}>
              {/* Animated Icon Container */}
              <View style={styles.iconContainer}>
                <Animated.View style={[styles.outerRing, { transform: [{ rotate: spin }] }]}>
                  <View style={styles.ringSegment} />
                  <View style={[styles.ringSegment, { transform: [{ rotate: '45deg' }] }]} />
                  <View style={[styles.ringSegment, { transform: [{ rotate: '90deg' }] }]} />
                  <View style={[styles.ringSegment, { transform: [{ rotate: '135deg' }] }]} />
                  <View style={[styles.ringSegment, { transform: [{ rotate: '180deg' }] }]} />
                  <View style={[styles.ringSegment, { transform: [{ rotate: '225deg' }] }]} />
                  <View style={[styles.ringSegment, { transform: [{ rotate: '270deg' }] }]} />
                  <View style={[styles.ringSegment, { transform: [{ rotate: '315deg' }] }]} />
                </Animated.View>
                
                <Animated.View style={[styles.innerCircle, { transform: [{ scale: pulseAnim }] }]}>
                  <View style={styles.iconWrapper}>
                    <User stroke="#F0B90B" width={32} height={32} strokeWidth={2} />
                    <CreditCard stroke="#F0B90B" width={24} height={24} strokeWidth={2} style={styles.idIcon} />
                  </View>
                </Animated.View>
              </View>

              {/* Upload Button */}
              <TouchableOpacity 
                style={styles.uploadButton} 
                onPress={showImagePicker}
                disabled={isUploading}
              >
                <Upload stroke="#000000" width={20} height={20} />
                <Text style={styles.uploadButtonText}>
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View style={[styles.previewSection, { opacity: fadeAnim }]}>
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: uploadedImage }} style={styles.previewImage} />
                <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
                  <X stroke="#FFFFFF" width={16} height={16} />
                </TouchableOpacity>
                <View style={styles.successBadge}>
                  <CheckCircle stroke="#00C087" width={20} height={20} fill="#00C087" />
                </View>
              </View>
              <Text style={styles.previewText}>Photo uploaded successfully!</Text>
              <TouchableOpacity style={styles.retakeButton} onPress={showImagePicker}>
                <Text style={styles.retakeButtonText}>Retake Photo</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        {/* Instructions */}
        <Animated.View style={[styles.instructionsSection, { opacity: fadeAnim }]}>        
          <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.instructionText}>Hold your ID card clearly against your chest</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.instructionText}>Your face must be clearly visible</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.instructionText}>ID card details should be readable</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.instructionText}>Good lighting and no shadows</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.instructionText}>No glasses, mask, or hat</Text>
            </View>
          </View>

          <View style={styles.warningContainer}>
            <AlertCircle stroke="#F0B90B" width={16} height={16} />
            <Text style={styles.warningText}>
              Both your face and ID card will be verified during this process.
            </Text>
          </View>
        </Animated.View>

        {/* Continue Button */}
        <Animated.View style={[styles.bottomContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              uploadedImage && styles.continueButtonActive
            ]} 
            onPress={handleContinue}
          >
            <Text style={[
              styles.continueButtonText,
              uploadedImage && styles.continueButtonTextActive
            ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerProgress: {
    flex: 1,
    marginHorizontal: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F0B90B',
    borderRadius: 2,
    width: '95%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 40,
  },
  uploadSection: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  outerRing: {
    width: 160,
    height: 160,
    position: 'absolute',
    top: -20,
    left: -20,
  },
  ringSegment: {
    position: 'absolute',
    width: 4,
    height: 20,
    backgroundColor: '#F0B90B',
    borderRadius: 2,
    top: 0,
    left: 78,
    transformOrigin: '2px 80px',
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1A1A1A',
    borderWidth: 3,
    borderColor: '#F0B90B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  idIcon: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0B90B',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#F0B90B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 8,
  },
  previewSection: {
    alignItems: 'center',
    width: '100%',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  previewImage: {
    width: 200,
    height: 250,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#00C087',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    padding: 4,
  },
  successBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 4,
  },
  previewText: {
    fontSize: 16,
    color: '#00C087',
    fontWeight: '500',
    marginBottom: 16,
  },
  retakeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#8E8E93',
    borderRadius: 8,
  },
  retakeButtonText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  instructionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  instructionsList: {
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F0B90B',
    marginRight: 12,
    marginTop: 6,
  },
  instructionText: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
    lineHeight: 20,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 185, 11, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F0B90B',
  },
  warningText: {
    fontSize: 12,
    color: '#F0B90B',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2D35',
  },
  continueButton: {
    backgroundColor: '#2A2D35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#F0B90B',
    shadowColor: '#F0B90B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8E8E93',
  },
  continueButtonTextActive: {
    color: '#000000',
  },
});

export default IDVerificationScreen;