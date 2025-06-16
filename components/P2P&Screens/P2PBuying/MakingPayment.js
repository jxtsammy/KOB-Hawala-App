// PaymentDetailsScreen.js (Updated with Cancel Modal)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  MessageCircle,
  Copy,
  HelpCircle,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const PaymentDetailsScreen = ({ navigation, route }) => {
  const { orderData } = route.params;
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedCancelReason, setSelectedCancelReason] = useState('');
  const [hasNotPaidSeller, setHasNotPaidSeller] = useState(false);

  const paymentDetails = {
    amount: orderData.fiatAmount,
    fullName: 'JAMES AMPAH',
    number: '385376',
    notes: 'Paddles',
    refMessage: '227588559105266442',
  };

  const cancelReasons = [
    {
      category: 'Due to buyer',
      options: [
        'I do not want to trade anymore',
        'I do not meet the requirements of the advertiser\'s trading terms and condition',
        'There is technical or network error with the payment platform',
        'I have not paid but clicked \'Transferred\'',
        'Other reasons'
      ]
    },
    {
      category: 'Due to seller',
      options: [
        'Seller is asking for extra fee',
        'Problem with seller\'s payment method result in unsuccessful payments',
        'Seller cannot release the order due to network issue. The seller has refunded the amount.',
        'No response from the seller',
        'Seller\'s payment account is invalid/frozen'
      ]
    }
  ];

  const handleCancelOrder = () => {
    setCancelModalVisible(true);
  };

  const handleConfirmCancellation = () => {
    if (!selectedCancelReason) {
      Alert.alert('Error', 'Please select a reason for cancellation');
      return;
    }

    if (!hasNotPaidSeller) {
      Alert.alert('Error', 'Please confirm that you have not paid the seller');
      return;
    }

    setCancelModalVisible(false);
    
    // Navigate to order details screen with cancelled status
    navigation.navigate('OrderCancelled', {
      orderData: {
        ...orderData,
        status: 'cancelled',
        cancelReason: selectedCancelReason
      }
    });
  };

  const handleUploadPaymentProof = () => {
    setUploadModalVisible(true);
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPaymentProof(result.assets[0].uri);
      setUploadModalVisible(false);
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPaymentProof(result.assets[0].uri);
      setUploadModalVisible(false);
    }
  };

  const handleConfirmPayment = () => {
    if (!paymentProof) {
      Alert.alert('Error', 'Please upload payment proof first');
      return;
    }

    if (!isConfirmed) {
      Alert.alert('Error', 'Please confirm that you have made the payment');
      return;
    }

    Alert.alert(
      'Transfer Successful',
      'Your payment has been submitted successfully. The seller will confirm receipt shortly.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('P2PNavigation'),
        },
      ]
    );
  };

  const copyToClipboard = (text) => {
    Alert.alert('Copied', `${text} copied to clipboard`);
  };

  const renderCancelModal = () => (
    <Modal
      visible={cancelModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setCancelModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.cancelModalContainer}>
          <View style={styles.cancelModalHeader}>
            <TouchableOpacity onPress={() => setCancelModalVisible(false)}>
              <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
            </TouchableOpacity>
            <Text style={styles.cancelModalTitle}>Select Reason to Cancel</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.cancelModalContent}>
            <Text style={styles.cancelTipsText}>Tips for order cancellation</Text>

            {cancelReasons.map((category, categoryIndex) => (
              <View key={categoryIndex} style={styles.cancelCategory}>
                <Text style={styles.cancelCategoryTitle}>{category.category}</Text>
                
                {category.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={styles.cancelOption}
                    onPress={() => setSelectedCancelReason(option)}
                  >
                    <View style={styles.radioButton}>
                      <View style={[
                        styles.radioButtonInner,
                        selectedCancelReason === option && styles.radioButtonSelected
                      ]} />
                    </View>
                    <Text style={styles.cancelOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            <View style={styles.confirmationCheckbox}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setHasNotPaidSeller(!hasNotPaidSeller)}
              >
                <View style={[styles.checkboxBox, hasNotPaidSeller && styles.checkboxChecked]}>
                  {hasNotPaidSeller && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>
                  I have not paid the seller / have received seller's refund
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.cancelModalFooter}>
            <TouchableOpacity
              style={[
                styles.confirmCancelButton,
                (!selectedCancelReason || !hasNotPaidSeller) && styles.confirmCancelButtonDisabled
              ]}
              onPress={handleConfirmCancellation}
              disabled={!selectedCancelReason || !hasNotPaidSeller}
            >
              <Text style={[
                styles.confirmCancelButtonText,
                (!selectedCancelReason || !hasNotPaidSeller) && styles.confirmCancelButtonTextDisabled
              ]}>
                Confirm Cancellation
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderUploadModal = () => (
    <Modal
      visible={uploadModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setUploadModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.uploadModalContainer}>
          <View style={styles.uploadModalHeader}>
            <Text style={styles.uploadModalTitle}>Upload Payment Proof</Text>
            <TouchableOpacity onPress={() => setUploadModalVisible(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.uploadOptions}>
            <TouchableOpacity style={styles.uploadOption} onPress={takePhoto}>
              <View style={styles.uploadOptionIcon}>
                <Text style={styles.uploadOptionEmoji}>📷</Text>
              </View>
              <Text style={styles.uploadOptionText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadOption} onPress={pickImage}>
              <View style={styles.uploadOptionIcon}>
                <Text style={styles.uploadOptionEmoji}>🖼️</Text>
              </View>
              <Text style={styles.uploadOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.uploadNote}>
            Please upload a clear screenshot or photo of your payment confirmation
          </Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancelOrder}>
          <Text style={styles.cancelText}>Cancel the Order</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Pay the Seller</Text>
          <Text style={styles.subtitle}>Order will be cancelled in 13:40</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>Payment</Text>
          </View>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Tips</Text>
            <View style={styles.tipsBadge}>
              <Text style={styles.tipsBadgeText}>●</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Payment Instructions */}
        <View style={styles.paymentInstructions}>
          <View style={styles.instructionHeader}>
            <View style={styles.instructionIcon}>
              <Text style={styles.instructionNumber}>1</Text>
            </View>
            <Text style={styles.instructionTitle}>Transfer via {orderData.paymentMethod}:</Text>
          </View>

          <View style={styles.paymentDetailsCard}>
            <View style={styles.paymentMethodHeader}>
              <View style={styles.paymentIndicator} />
              <Text style={styles.paymentMethodName}>{orderData.paymentMethod}</Text>
            </View>

            <View style={styles.paymentDetailsList}>
              <View style={styles.paymentDetailRow}>
                <Text style={styles.paymentDetailLabel}>You Pay</Text>
                <View style={styles.paymentDetailValue}>
                  <Text style={styles.paymentAmount}>GHS{paymentDetails.amount}</Text>
                  <TouchableOpacity onPress={() => copyToClipboard(paymentDetails.amount)}>
                    <Copy stroke="#8E8E93" width={16} height={16} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.paymentDetailRow}>
                <Text style={styles.paymentDetailLabel}>Full name</Text>
                <View style={styles.paymentDetailValue}>
                  <Text style={styles.paymentDetailText}>{paymentDetails.fullName}</Text>
                  <TouchableOpacity onPress={() => copyToClipboard(paymentDetails.fullName)}>
                    <Copy stroke="#8E8E93" width={16} height={16} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.paymentDetailRow}>
                <Text style={styles.paymentDetailLabel}>{orderData.paymentMethod} Number</Text>
                <View style={styles.paymentDetailValue}>
                  <Text style={styles.paymentDetailText}>{paymentDetails.number}</Text>
                  <TouchableOpacity onPress={() => copyToClipboard(paymentDetails.number)}>
                    <Copy stroke="#8E8E93" width={16} height={16} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.paymentDetailRow}>
                <Text style={styles.paymentDetailLabel}>Notes</Text>
                <View style={styles.paymentDetailValue}>
                  <Text style={styles.paymentDetailText}>{paymentDetails.notes}</Text>
                  <TouchableOpacity onPress={() => copyToClipboard(paymentDetails.notes)}>
                    <Copy stroke="#8E8E93" width={16} height={16} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.paymentDetailRow}>
                <Text style={styles.paymentDetailLabel}>Ref Message</Text>
                <View style={styles.paymentDetailValue}>
                  <Text style={styles.paymentDetailText}>{paymentDetails.refMessage}</Text>
                  <TouchableOpacity onPress={() => copyToClipboard(paymentDetails.refMessage)}>
                    <Copy stroke="#8E8E93" width={16} height={16} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.paymentNote}>
              Tips: Use your own payment account and ensure that the name on the account matches the name you used to verify your KOB Hawala account.
            </Text>
          </View>
        </View>

        {/* Upload Instructions */}
        <View style={styles.uploadInstructions}>
          <View style={styles.instructionHeader}>
            <View style={styles.instructionIcon}>
              <Text style={styles.instructionNumber}>2</Text>
            </View>
            <Text style={styles.instructionTitle}>
              Tap the button below to upload payment proof for Seller's confirmation
            </Text>
          </View>
        </View>

        {/* Payment Proof Preview */}
        {paymentProof && (
          <View style={styles.proofPreview}>
            <Text style={styles.proofPreviewTitle}>Payment Proof:</Text>
            <Image source={{ uri: paymentProof }} style={styles.proofImage} />
          </View>
        )}

        {/* Confirmation Checkbox */}
        <View style={styles.confirmationSection}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIsConfirmed(!isConfirmed)}
          >
            <View style={[styles.checkboxBox, isConfirmed && styles.checkboxChecked]}>
              {isConfirmed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>
              I confirm that I have made the payment to the seller
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Help Button */}
      <TouchableOpacity style={styles.helpButton}>
        <HelpCircle stroke="#FFFFFF" width={20} height={20} />
        <Text style={styles.helpText}>Help</Text>
      </TouchableOpacity>

      {/* Upload Payment Proof Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.uploadButton,
            paymentProof && isConfirmed && styles.uploadButtonActive
          ]}
          onPress={paymentProof && isConfirmed ? handleConfirmPayment : handleUploadPaymentProof}
        >
          <Text style={styles.uploadButtonText}>
            {paymentProof && isConfirmed ? 'Confirm Payment' : 'Upload Payment Proof'}
          </Text>
        </TouchableOpacity>
      </View>

      {renderCancelModal()}
      {renderUploadModal()}
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
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
  },
  cancelText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleSection: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#F0B90B',
    paddingBottom: 8,
    marginRight: 24,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inactiveTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  inactiveTabText: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 4,
  },
  tipsBadge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F0B90B',
  },
  tipsBadgeText: {
    fontSize: 6,
    color: '#F0B90B',
  },
  paymentInstructions: {
    marginBottom: 20,
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0B90B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instructionNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  instructionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  paymentDetailsCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginRight: 8,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  paymentDetailsList: {
    marginBottom: 16,
  },
  paymentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentDetailLabel: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
  },
  paymentDetailValue: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  paymentDetailText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 8,
  },
  paymentNote: {
    fontSize: 12,
    color: '#8E8E93',
    lineHeight: 16,
  },
  uploadInstructions: {
    marginBottom: 20,
  },
  proofPreview: {
    marginBottom: 20,
  },
  proofPreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  proofImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  confirmationSection: {
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#8E8E93',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F0B90B',
    borderColor: '#F0B90B',
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  checkboxText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  helpButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D35',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  helpText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2D35',
  },
  uploadButton: {
    backgroundColor: '#2A2D35',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  uploadButtonActive: {
    backgroundColor: '#F0B90B',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  // Cancel Modal Styles
  cancelModalContainer: {
    backgroundColor: '#111111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '100%',
    flex: 1,
  },
  cancelModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2D35',
    paddingTop: 70
  },
  cancelModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelModalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  cancelTipsText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 20,
  },
  cancelCategory: {
    marginBottom: 24,
  },
  cancelCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  cancelOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8E8E93',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioButtonSelected: {
    backgroundColor: '#F0B90B',
  },
  cancelOptionText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 20,
  },
  confirmationCheckbox: {
    marginTop: 20,
    marginBottom: 20,
  },
  cancelModalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2D35',
    paddingBottom:10
  },
  confirmCancelButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20
  },
  confirmCancelButtonDisabled: {
    backgroundColor: '#2A2D35',
  },
  confirmCancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  confirmCancelButtonTextDisabled: {
    color: '#8E8E93',
  },
  // Upload Modal Styles
  uploadModalContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 'auto',
  },
  uploadModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalClose: {
    fontSize: 18,
    color: '#8E8E93',
  },
  uploadOptions: {
    marginBottom: 16,
  },
  uploadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2A2D35',
    borderRadius: 8,
    marginBottom: 12,
  },
  uploadOptionIcon: {
    marginRight: 12,
  },
  uploadOptionEmoji: {
    fontSize: 24,
  },
  uploadOptionText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  uploadNote: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default PaymentDetailsScreen;