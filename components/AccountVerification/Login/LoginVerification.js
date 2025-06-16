import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
  Animated,
  Dimensions
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const { height } = Dimensions.get('window')

const VerificationScreen = ({ route, navigation }) => {
  const { contactInfo, isEmail } = route.params || {}
  const [verificationCode, setVerificationCode] = useState("")
  const [timer, setTimer] = useState(30 * 60) // 30 minutes in seconds
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showHelpModal, setShowHelpModal] = useState(false)
  
  // Animation for the bottom sheet
  const bottomSheetAnim = useRef(new Animated.Value(height)).current
  
  // Format the contact info for display
  const formattedContact = isEmail 
    ? contactInfo 
    : contactInfo?.includes('+') 
      ? contactInfo 
      : `+${contactInfo}`

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Animate the bottom sheet
  useEffect(() => {
    if (showHelpModal) {
      Animated.timing(bottomSheetAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(bottomSheetAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [showHelpModal, bottomSheetAnim])

  // Format timer to minutes:seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Handle code verification
  const handleVerify = () => {
    if (verificationCode.length < 6) {
      setErrorMessage("Please enter the complete 6-digit code")
      return
    }

    setIsLoading(true)
    
    // Simulate verification API call
    setTimeout(() => {
      setIsLoading(false)
      
      // For demo purposes, any 6-digit code is accepted
      if (verificationCode.length === 6) {
        navigation.navigate('NavigationBar')
      } else {
        setErrorMessage("Invalid verification code. Please try again.")
      }
    }, 1500)
  }

  // Request a new code
  const handleResendCode = () => {
    setShowHelpModal(false)
    setIsLoading(true)
    
    // Simulate API call to resend code
    setTimeout(() => {
      setIsLoading(false)
      setTimer(30 * 60) // Reset timer to 30 minutes
      setErrorMessage("")
      Alert.alert("Code Sent", "A new verification code has been sent.")
    }, 1500)
  }

  // Show the help modal
  const handleShowHelpModal = () => {
    setShowHelpModal(true)
  }

  // Close the help modal
  const handleCloseHelpModal = () => {
    setShowHelpModal(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1e25" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="headset-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Verify your {isEmail ? 'email' : 'number'}</Text>
        
        <Text style={styles.description}>
          Please enter the 6-digit verification code sent to {formattedContact}.
          The code is valid for {formatTime(timer)}.
        </Text>
        
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Verification Code</Text>
          <View style={styles.codeInputContainer}>
            <TextInput
              style={styles.codeInput}
              value={verificationCode}
              onChangeText={(text) => {
                setVerificationCode(text.replace(/[^0-9]/g, ''))
                setErrorMessage("")
              }}
              placeholder="Enter verification code"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
          
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.verifyButton,
            (verificationCode.length < 6 || isLoading) && styles.disabledButton
          ]}
          onPress={handleVerify}
          disabled={verificationCode.length < 6 || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.verifyButtonText}>Next</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.didntReceiveButton}
          onPress={handleShowHelpModal}
        >
          <Text style={styles.didntReceiveText}>Didn't receive the code?</Text>
        </TouchableOpacity>
      </View>

      {/* Help Modal */}
      <Modal
        transparent={true}
        visible={showHelpModal}
        animationType="none"
        onRequestClose={handleCloseHelpModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCloseHelpModal}
        >
          <Animated.View 
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY: bottomSheetAnim }]
              }
            ]}
          >
            <View style={styles.bottomSheetContent}>
              <View style={styles.bottomSheetHeader}>
                <Text style={styles.bottomSheetTitle}>Didn't receive the code?</Text>
                <TouchableOpacity onPress={handleCloseHelpModal}>
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.helpItemContainer}>
                <View style={styles.helpItem}>
                  <View style={styles.helpIconContainer}>
                    <Ionicons name="checkmark-circle" size={24} color="#F0B90B" />
                  </View>
                  <Text style={styles.helpText}>
                    Verify that you entered the correct phone number: {formattedContact}
                  </Text>
                </View>
                
                <View style={styles.helpItem}>
                  <View style={styles.helpIconContainer}>
                    <Ionicons name="wifi" size={24} color="#F0B90B" />
                  </View>
                  <Text style={styles.helpText}>
                    Check your internet connection and make sure it's stable
                  </Text>
                </View>
                
                <View style={styles.helpItem}>
                  <View style={styles.helpIconContainer}>
                    <Ionicons name="time-outline" size={24} color="#F0B90B" />
                  </View>
                  <Text style={styles.helpText}>
                    Wait a few minutes and try again. SMS delivery can sometimes be delayed
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.resendCodeButton}
                onPress={handleResendCode}
              >
                <Text style={styles.resendCodeText}>Resend Code</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1e25",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 40,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 10,
  },
  codeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    backgroundColor: "#272b33",
    overflow: "hidden",
  },
  codeInput: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 15,
  },
  errorText: {
    color: "#ff4d4f",
    marginTop: 8,
  },
  verifyButton: {
    backgroundColor: "#F0B90B",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  verifyButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  didntReceiveButton: {
    alignItems: "center",
    padding: 10,
  },
  didntReceiveText: {
    color: "#F0B90B",
    fontSize: 16,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#1E2126',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 300,
    paddingBottom: 30, // Extra padding for bottom safe area
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpItemContainer: {
    marginBottom: 20,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  helpIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  helpText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  resendCodeButton: {
    backgroundColor: '#F0B90B',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendCodeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;