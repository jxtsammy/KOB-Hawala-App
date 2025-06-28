"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const PhoneVerificationScreen = ({ navigation, route }) => {
  // Get the contact info from route params
  const { phoneNumber = "", countryCode = "", callingCode = "", contactInfo = "", isEmail = false } = route.params || {}

  // Format the display based on whether it's email or phone
  const getFormattedContact = () => {
    if (isEmail) {
      return contactInfo || "your email"
    } else if (phoneNumber && callingCode) {
      return `+${callingCode}-${phoneNumber}`
    } else if (contactInfo) {
      return contactInfo
    } else {
      return "your number"
    }
  }

  const formattedContact = getFormattedContact()

  const [verificationCode, setVerificationCode] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isResendingCode, setIsResendingCode] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30) // 30 minutes countdown
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputRef = useRef(null)

  // Timer for code expiration countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  // Trigger verification code sending when component mounts
  useEffect(() => {
    // Simulate sending verification code
    const sendVerificationCode = () => {
      console.log(`Sending verification code to ${isEmail ? "email" : "phone"}: ${formattedContact}`)
      // Here you would make an API call to send the verification code
      // For email: send email verification
      // For phone: send SMS verification
    }

    sendVerificationCode()
  }, [formattedContact, isEmail])

  // Handle verification code input
  const handleCodeChange = (text) => {
    // Only allow numbers
    if (/^\d*$/.test(text) && text.length <= 6) {
      setVerificationCode(text)
      setErrorMessage("")
    }
  }

  // Handle resend code
  const handleResendCode = () => {
    setIsResendingCode(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setIsResendingCode(false)
      setTimeLeft(30) // Reset timer to 30 minutes
      setErrorMessage("")

      console.log(`Resending verification code to ${isEmail ? "email" : "phone"}: ${formattedContact}`)

      // Focus on the input field
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 2000)
  }

  // Handle verification submission
  const handleVerify = () => {
    if (verificationCode.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit code")
      return
    }

    setIsSubmitting(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false)

      // Navigate to the next screen based on verification success
      if (navigation) {
        if (isEmail) {
          // For email verification, navigate to appropriate screen
          navigation.navigate("ConfirmInfo", {
            contactInfo,
            isEmail: true,
          })
        } else {
          // For phone verification, navigate to ConfirmInfo screen
          navigation.navigate("ConfirmInfo", {
            phoneNumber,
            countryCode,
            callingCode,
            contactInfo: formattedContact,
          })
        }
      }
    }, 2000)
  }

  // Toggle help modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1A1E23" />

        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportButton}>
            <Ionicons name="headset-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>Verify your {isEmail ? "email" : "number"}</Text>

          {/* Instructions */}
          <Text style={styles.instructions}>
            Please enter the 6-digit verification code sent to {formattedContact}. The code is valid for {timeLeft}{" "}
            minutes.
          </Text>

          {/* Verification Code Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Verification Code</Text>
            <View style={styles.codeInputContainer}>
              <TextInput
                ref={inputRef}
                style={styles.codeInput}
                value={verificationCode}
                onChangeText={handleCodeChange}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#8e8e93"
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
            </View>

            {/* Error message */}
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, (verificationCode.length !== 6 || isSubmitting) && styles.nextButtonDisabled]}
            onPress={handleVerify}
            disabled={verificationCode.length !== 6 || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.nextButtonText}>Next</Text>
            )}
          </TouchableOpacity>

          {/* Didn't receive code button */}
          <TouchableOpacity style={styles.didntReceiveContainer} onPress={toggleModal}>
            <Text style={styles.didntReceiveText}>Didn't receive the code?</Text>
          </TouchableOpacity>
        </View>

        {/* Help Modal */}
        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Didn't receive the code?</Text>
                    <TouchableOpacity onPress={toggleModal}>
                      <Ionicons name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalBody}>
                    <View style={styles.helpItem}>
                      <Ionicons name="checkmark-circle" size={24} color="#F0B90B" style={styles.helpIcon} />
                      <Text style={styles.helpText}>
                        Verify that you entered the correct {isEmail ? "email address" : "phone number"}:{" "}
                        {formattedContact}
                      </Text>
                    </View>

                    <View style={styles.helpItem}>
                      <Ionicons name="wifi" size={24} color="#F0B90B" style={styles.helpIcon} />
                      <Text style={styles.helpText}>Check your internet connection and make sure it's stable</Text>
                    </View>

                    <View style={styles.helpItem}>
                      <Ionicons name="time-outline" size={24} color="#F0B90B" style={styles.helpIcon} />
                      <Text style={styles.helpText}>
                        Wait a few minutes and try again. {isEmail ? "Email" : "SMS"} delivery can sometimes be delayed
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.resendButton}
                    onPress={() => {
                      toggleModal()
                      handleResendCode()
                    }}
                    disabled={isResendingCode}
                  >
                    {isResendingCode ? (
                      <ActivityIndicator size="small" color="#000" />
                    ) : (
                      <Text style={styles.resendButtonText}>Resend Code</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  supportButton: {
    padding: 5,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  instructions: {
    color: "#8e8e93",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputLabel: {
    color: "#8e8e93",
    fontSize: 16,
    marginBottom: 10,
  },
  codeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    height: 50,
  },
  codeInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 15,
    height: "100%",
  },
  errorMessage: {
    color: "#ff4d4f",
    fontSize: 14,
    marginTop: 8,
  },
  nextButton: {
    backgroundColor: "#F0B90B",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  didntReceiveContainer: {
    alignItems: "flex-start",
  },
  didntReceiveText: {
    color: "#F0B90B",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1A1E23",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalBody: {
    marginBottom: 30,
  },
  helpItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  helpIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  helpText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  resendButton: {
    backgroundColor: "#F0B90B",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  resendButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default PhoneVerificationScreen