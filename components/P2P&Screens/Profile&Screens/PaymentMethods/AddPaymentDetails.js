// AddPaymentDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  Upload,
  Camera,
  Image as ImageIcon,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const AddPaymentDetailsScreen = ({ navigation, route }) => {
  const { paymentMethod, onPaymentMethodAdded } = route.params;
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    swiftCode: '',
    note: '',
    qrCodeImage: null,
  });

  const isMobileMethod = paymentMethod.type === 'mobile';
  const isBankMethod = paymentMethod.type === 'bank';
  const isDigitalMethod = paymentMethod.type === 'digital';

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange('qrCodeImage', result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange('qrCodeImage', result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose how you want to add an image',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }

    if (isMobileMethod && !formData.phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }

    if (isBankMethod) {
      if (!formData.accountNumber.trim()) {
        Alert.alert('Error', 'Please enter your account number');
        return false;
      }
      if (!formData.bankName.trim()) {
        Alert.alert('Error', 'Please enter your bank name');
        return false;
      }
    }

    if (isDigitalMethod && !formData.accountNumber.trim()) {
      Alert.alert('Error', 'Please enter your account email or username');
      return false;
    }

    return true;
  };

  const handleConfirm = () => {
    if (!validateForm()) return;

    // Create the new payment method object
    const newPaymentMethod = {
      id: Date.now().toString(), // Generate unique ID
      type: paymentMethod.name,
      name: formData.name,
      details: isMobileMethod ? formData.phoneNumber : formData.accountNumber,
      icon: paymentMethod.icon,
      color: paymentMethod.color,
      ...(isBankMethod && {
        bankName: formData.bankName,
        branch: formData.branchName,
        swiftCode: formData.swiftCode,
      }),
      note: formData.note,
      qrCodeImage: formData.qrCodeImage,
    };

    // Call the callback function to add the payment method
    if (onPaymentMethodAdded) {
      onPaymentMethodAdded(newPaymentMethod);
    }

    // Show success message
    Alert.alert(
      'Success',
      'Payment method added successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to PaymentMethods screen
            navigation.navigate('P2PPaymentMethods');
          }
        }
      ]
    );
  };

  const renderMobileFields = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        value={formData.phoneNumber}
        onChangeText={(value) => handleInputChange('phoneNumber', value)}
        placeholder="Enter phone number"
        placeholderTextColor="#8E8E93"
        keyboardType="phone-pad"
      />
    </View>
  );

  const renderBankFields = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Account Number</Text>
        <TextInput
          style={styles.textInput}
          value={formData.accountNumber}
          onChangeText={(value) => handleInputChange('accountNumber', value)}
          placeholder="Enter your account number"
          placeholderTextColor="#8E8E93"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Bank Name</Text>
        <TextInput
          style={styles.textInput}
          value={formData.bankName}
          onChangeText={(value) => handleInputChange('bankName', value)}
          placeholder="Enter bank name"
          placeholderTextColor="#8E8E93"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Branch Name (Optional)</Text>
        <TextInput
          style={styles.textInput}
          value={formData.branchName}
          onChangeText={(value) => handleInputChange('branchName', value)}
          placeholder="Enter branch name"
          placeholderTextColor="#8E8E93"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>SWIFT Code (Optional)</Text>
        <TextInput
          style={styles.textInput}
          value={formData.swiftCode}
          onChangeText={(value) => handleInputChange('swiftCode', value)}
          placeholder="Enter SWIFT code"
          placeholderTextColor="#8E8E93"
          autoCapitalize="characters"
        />
      </View>
    </>
  );

  const renderDigitalFields = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Account Email/Username</Text>
      <TextInput
        style={styles.textInput}
        value={formData.accountNumber}
        onChangeText={(value) => handleInputChange('accountNumber', value)}
        placeholder="Enter your email or username"
        placeholderTextColor="#8E8E93"
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add {paymentMethod.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Name Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.textInput}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder="Enter name"
            placeholderTextColor="#8E8E93"
            autoCapitalize="characters"
          />
          <Text style={styles.inputHint}>
            Changing your verified name may temporarily disable the P2P function. If you still wish to proceed, please tap here.
          </Text>
        </View>

        {/* Dynamic Fields based on payment method type */}
        {isMobileMethod && renderMobileFields()}
        {isBankMethod && renderBankFields()}
        {isDigitalMethod && renderDigitalFields()}

        {/* Note Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Note (optional)</Text>
          <TextInput
            style={[styles.textInput, styles.noteInput]}
            value={formData.note}
            onChangeText={(value) => handleInputChange('note', value)}
            placeholder="Add any additional notes or instructions"
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* QR Code Upload */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>QR code (optional)</Text>
          <TouchableOpacity style={styles.uploadContainer} onPress={showImagePicker}>
            {formData.qrCodeImage ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: formData.qrCodeImage }} style={styles.uploadedImage} />
                <TouchableOpacity 
                  style={styles.changeImageButton}
                  onPress={showImagePicker}
                >
                  <Text style={styles.changeImageText}>Change Image</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Upload stroke="#8E8E93" width={32} height={32} />
                <Text style={styles.uploadText}>Upload QR Code</Text>
                <Text style={styles.uploadSubtext}>Tap to add from camera or gallery</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Tips:</Text>
          <Text style={styles.tipsText}>
            • Please ensure the payment details added are correct and the name matches your KYC info.{'\n'}
            • Using a third party account might result in order cancellation and/or account suspension.{'\n'}
            • Double-check all information before confirming to avoid delays in transactions.
          </Text>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 5
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2A2D35',
  },
  noteInput: {
    height: 100,
    paddingTop: 14,
  },
  inputHint: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 8,
    lineHeight: 16,
  },
  uploadContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2A2D35',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 12,
    fontWeight: '500',
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    padding: 20,
  },
  uploadedImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  changeImageButton: {
    backgroundColor: '#2A2D35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changeImageText: {
    color: '#F0B90B',
    fontSize: 14,
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F0B90B',
  },
  tipsTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2D35',
  },
  confirmButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#F0B90B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default AddPaymentDetailsScreen;