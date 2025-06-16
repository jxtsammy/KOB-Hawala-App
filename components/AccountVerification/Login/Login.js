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
  Alert
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CountryPicker from "react-native-country-picker-modal"

const LoginScreen = ({
  navigation,
  googleLogoSource = require("../../../assets/google.png"),
}) => {
  const [inputValue, setInputValue] = useState("")
  const [isPhoneMode, setIsPhoneMode] = useState(false)
  const [countryCode, setCountryCode] = useState("US")
  const [callingCode, setCallingCode] = useState("1")
  const [countryPickerVisible, setCountryPickerVisible] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null) // 'email', 'phone', 'passkey', 'google'

  const inputRef = useRef(null)
  const phoneInputRef = useRef(null)

  // Check if the first character is a number to switch to phone mode
  const handleInputChange = (text) => {
    setInputValue(text)

    if (text.length === 1 && !isNaN(Number.parseInt(text, 10))) {
      setIsPhoneMode(true)
      setPhoneNumber(text)
      setInputValue("")
      setSelectedOption('phone')
    } else if (!isPhoneMode) {
      setInputValue(text)
      if (text.length > 0) {
        setSelectedOption('email')
      } else {
        setSelectedOption(null)
      }
    }
  }

  // Handle phone number input when in phone mode
  const handlePhoneNumberChange = (text) => {
    // Only allow numbers
    if (/^\d*$/.test(text)) {
      setPhoneNumber(text)
      if (text.length > 0) {
        setSelectedOption('phone')
      } else {
        setSelectedOption(null)
      }
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

  // Clear input
  const handleClearInput = () => {
    if (isPhoneMode) {
      setPhoneNumber("")
      setSelectedOption(null)
      if (phoneInputRef.current) {
        phoneInputRef.current.focus()
      }
    } else {
      setInputValue("")
      setSelectedOption(null)
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  // Handle next button press
  const handleNextPress = () => {
    setIsLoading(true)
    
    // Simulate API call to send verification code
    setTimeout(() => {
      setIsLoading(false)
      
      if (isPhoneMode) {
        // Navigate to verification screen with phone number
        const fullPhoneNumber = `+${callingCode}-${phoneNumber}`
        navigation.navigate('LoginVerification', { 
          contactInfo: fullPhoneNumber,
          isEmail: false
        })
      } else {
        // Navigate to verification screen with email
        navigation.navigate('LoginVerification', { 
          contactInfo: inputValue,
          isEmail: true
        })
      }
    }, 1500)
  }

  // Handle alternative login options
  const handleAlternativeLogin = (option) => {
    setSelectedOption(option)
    
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      
      if (option === 'google') {
        Alert.alert("Google", "Google authentication would be triggered here")
      }
    }, 1000)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#111" />

        <View style={styles.contentContainer}>
          {/* Header with close button */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Log in</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Email/Phone number</Text>

            {!isPhoneMode ? (
              // Email input mode
              <View style={[
                styles.inputContainer,
                selectedOption === 'email' && styles.selectedInputContainer
              ]}>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  value={inputValue}
                  onChangeText={handleInputChange}
                  placeholder="Email or phone number"
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
              <View style={[
                styles.phoneInputContainer,
                selectedOption === 'phone' && styles.selectedInputContainer
              ]}>
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

          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              (!isPhoneMode && inputValue.length === 0) || (isPhoneMode && phoneNumber.length === 0) || isLoading
                ? styles.nextButtonDisabled
                : {},
            ]}
            disabled={(!isPhoneMode && inputValue.length === 0) || (isPhoneMode && phoneNumber.length === 0) || isLoading}
            onPress={handleNextPress}
          >
            {isLoading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.nextButtonText}>Next</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Alternative Login Options */}
          <View style={styles.alternativeLoginContainer}>
            <TouchableOpacity 
              style={[
                styles.alternativeLoginButton,
                selectedOption === 'google' && styles.selectedAlternativeButton
              ]}
              onPress={() => handleAlternativeLogin('google')}
            >
              <Image source={googleLogoSource} style={styles.logoIcon} />
              <Text style={styles.alternativeLoginText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Create Account Link */}
          <TouchableOpacity style={styles.createAccountContainer} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.createAccountText}>Create an Account</Text>
          </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
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
  selectedInputContainer: {
    borderWidth: 2,
    borderColor: "#F0B90B",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    height: "100%",
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
  alternativeLoginContainer: {
    marginBottom: 30,
  },
  alternativeLoginButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  selectedAlternativeButton: {
    borderWidth: 2,
    borderColor: "#F0B90B",
  },
  logoIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  alternativeLoginText: {
    color: "#fff",
    fontSize: 17,
    flex: 1,
    textAlign: "center",
    marginRight: 24, 
  },
  createAccountContainer: {
    alignItems: "center",
  },
  createAccountText: {
    color: "#F0B90B",
    fontSize: 18,
  },
})

export default LoginScreen