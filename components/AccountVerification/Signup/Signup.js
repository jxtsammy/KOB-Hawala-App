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
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CountryPicker from "react-native-country-picker-modal"

const SignupScreen = ({
  navigation,
  googleLogoSource = require("../../../assets/google.png"),
  appleLogoSource = require("../../../assets/apple.png"),
}) => {
  const [inputValue, setInputValue] = useState("")
  const [isPhoneMode, setIsPhoneMode] = useState(false)
  const [countryCode, setCountryCode] = useState("US")
  const [callingCode, setCallingCode] = useState("1")
  const [countryPickerVisible, setCountryPickerVisible] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef(null)
  const phoneInputRef = useRef(null)

  // Check if the first character is a number to switch to phone mode
  const handleInputChange = (text) => {
    setInputValue(text)

    if (text.length === 1 && !isNaN(Number.parseInt(text, 10))) {
      setIsPhoneMode(true)
      setPhoneNumber(text)
      setInputValue("")
    } else if (!isPhoneMode) {
      setInputValue(text)
    }
  }

  // Handle phone number input when in phone mode
  const handlePhoneNumberChange = (text) => {
    // Only allow numbers
    if (/^\d*$/.test(text)) {
      setPhoneNumber(text)
    }
  }

  // Focus the phone input when switching to phone mode
  useEffect(() => {
    if (isPhoneMode && phoneInputRef.current) {
      setTimeout(() => {
        phoneInputRef.current.focus()
      }, 100)
    }
  }, [isPhoneMode])

  // Handle country selection
  const onSelectCountry = (country) => {
    setCountryCode(country.cca2)
    setCallingCode(country.callingCode[0])
    setCountryPickerVisible(false)

    // Focus back on the phone input after country selection
    if (phoneInputRef.current) {
      setTimeout(() => {
        phoneInputRef.current.focus()
      }, 100)
    }
  }

  // Toggle terms acceptance
  const toggleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted)
  }

  // Navigate to login screen
  const navigateToLogin = () => {
    if (navigation) {
      navigation.navigate("Login")
    }
  }

  // Clear input
  const handleClearInput = () => {
    if (isPhoneMode) {
      setPhoneNumber("")
      if (phoneInputRef.current) {
        phoneInputRef.current.focus()
      }
    } else {
      setInputValue("")
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  // Handle next button press
  const handleNextPress = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      if (isPhoneMode) {
        // Navigate to phone verification
        navigation.navigate("PhoneVerifcation", {
          phoneNumber,
          countryCode,
          callingCode,
          contactInfo: `+${callingCode}-${phoneNumber}`,
          isEmail: false,
        })
      } else {
        // Navigate to email verification
        navigation.navigate("PhoneVerifcation", {
          contactInfo: inputValue,
          isEmail: true,
        })
      }
    }, 1500)
  }

  const formatPhoneNumber = (number, country) => {
    // This is a simplified formatter - in a real app you would use a library
    if (!number) return number

    // Remove any non-digit characters
    const digits = number.replace(/\D/g, "")

    // Format based on country
    switch (country) {
      case "GH": // Ghana
        if (digits.length <= 3) return digits
        if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
        return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
      case "US": // US
        if (digits.length <= 3) return digits
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      default:
        // Generic formatting with spaces every 3 digits
        return digits.replace(/(\d{3})/g, "$1 ").trim()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1A1E23" />

        <View style={styles.contentContainer}>
          {/* Header with support and close buttons */}
          <View style={styles.header}>
            <View style={styles.headerSpacer} />
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.supportButton}>
                <Ionicons name="headset" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome to KOB Hawala</Text>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Email/Phone number</Text>

            {!isPhoneMode ? (
              // Email input mode
              <View style={styles.inputContainer}>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  value={inputValue}
                  onChangeText={handleInputChange}
                  placeholder="Email/Phone (without country code)"
                  placeholderTextColor="#8e8e93"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {inputValue.length > 0 && (
                  <TouchableOpacity style={styles.clearButton} onPress={handleClearInput}>
                    <Ionicons name="close-circle" size={20} color="#8e8e93" />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              // Phone input mode with country picker
              <View style={styles.phoneInputContainer}>
                <TouchableOpacity style={styles.countryPickerButton} onPress={() => setCountryPickerVisible(true)}>
                  <CountryPicker
                    withFlag
                    withEmoji={false}
                    withCallingCodeButton={false}
                    withCallingCode={false}
                    withFilter={false}
                    countryCode={countryCode}
                    onSelect={() => {}}
                    visible={false}
                  />
                  <Text style={styles.callingCode}>+{callingCode}</Text>
                  <Ionicons name="chevron-down" size={16} color="#fff" />
                </TouchableOpacity>

                <View style={styles.phoneNumberContainer}>
                  <TextInput
                    ref={phoneInputRef}
                    style={styles.phoneNumberInput}
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    placeholder="Phone number"
                    placeholderTextColor="#8e8e93"
                    keyboardType="phone-pad"
                  />
                </View>

                {phoneNumber.length > 0 && (
                  <TouchableOpacity style={styles.clearButton} onPress={handleClearInput}>
                    <Ionicons name="close-circle" size={20} color="#8e8e93" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* Terms Checkbox */}
          <TouchableOpacity style={styles.termsContainer} onPress={toggleTermsAccepted} activeOpacity={0.7}>
            <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
              {termsAccepted && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.termsText}>
              By creating an account, I agree to KOB Hawala's <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Notice</Text>.
            </Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              ((!isPhoneMode && inputValue.length === 0) ||
                (isPhoneMode && phoneNumber.length === 0) ||
                !termsAccepted ||
                isLoading) &&
                styles.nextButtonDisabled,
            ]}
            disabled={
              (!isPhoneMode && inputValue.length === 0) ||
              (isPhoneMode && phoneNumber.length === 0) ||
              !termsAccepted ||
              isLoading
            }
            onPress={handleNextPress}
          >
            {isLoading ? <ActivityIndicator color="#000" /> : <Text style={styles.nextButtonText}>Next</Text>}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Alternative Signup Options */}
          <View style={styles.alternativeSignupContainer}>
            <TouchableOpacity style={styles.alternativeSignupButton}>
              <Image source={googleLogoSource} style={styles.logoIcon} />
              <Text style={styles.alternativeSignupText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Links */}
          <View style={styles.bottomLinksContainer}>
            <Text style={styles.orText}>Already have an account?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Country Picker Modal */}
        <CountryPicker
          withFilter
          withFlag
          withCallingCode
          withCallingCodeButton={false}
          withAlphaFilter
          withEmoji
          onSelect={onSelectCountry}
          visible={countryPickerVisible}
          onClose={() => setCountryPickerVisible(false)}
          containerButtonStyle={{ display: "none" }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  headerSpacer: {
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
  },
  supportButton: {
    padding: 5,
    marginRight: 15,
  },
  closeButton: {
    padding: 5,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#8e8e93",
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  phoneInputContainer: {
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  countryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: "100%",
    borderRightWidth: 1,
    borderRightColor: "#3A3D45",
  },
  callingCode: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  phoneNumberContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  phoneNumberInput: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 15,
    height: "100%",
  },
  clearButton: {
    padding: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#F0B90B",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#F0B90B",
  },
  termsText: {
    color: "#8e8e93",
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    color: "#F0B90B",
    textDecorationLine: "underline",
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
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#3A3D45",
  },
  dividerText: {
    color: "#8e8e93",
    paddingHorizontal: 10,
  },
  alternativeSignupContainer: {
    marginBottom: 30,
  },
  alternativeSignupButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  logoIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: "contain",
  },
  alternativeSignupText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    marginRight: 24, // To offset the logo on the left for better centering
  },
  bottomLinksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orText: {
    color: "#8e8e93",
    fontSize: 16,
    marginHorizontal: 10,
  },
  loginText: {
    color: "#F0B90B",
    fontSize: 16,
  },
})

export default SignupScreen