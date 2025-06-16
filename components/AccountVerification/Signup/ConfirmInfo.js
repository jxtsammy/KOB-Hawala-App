"use client"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Easing,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CountryPicker from "react-native-country-picker-modal"

const ConfirmInformationScreen = ({ navigation, route }) => {
  // Get data from route params if available
  const routeParams = route?.params || {}
  const isEmailVerification = routeParams.isEmail || false

  const [nationality, setNationality] = useState("GH")
  const [countryName, setCountryName] = useState("Ghana")
  const [legalName, setLegalName] = useState("")
  const [middleNames, setMiddleNames] = useState("")

  // Initialize email from route params if available
  const [email, setEmail] = useState(
    isEmailVerification ? routeParams.emailAddress || routeParams.contactInfo || "" : "",
  )

  const [yearOfBirth, setYearOfBirth] = useState("")
  const [monthOfBirth, setMonthOfBirth] = useState("")
  const [dayOfBirth, setDayOfBirth] = useState("")
  const [residentialAddress, setResidentialAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")

  // Phone number fields - initialize with route params if available
  const [phoneCountryCode, setPhoneCountryCode] = useState(routeParams.countryCode || "GH")
  const [phoneCallingCode, setPhoneCallingCode] = useState(routeParams.callingCode || "233")
  const [phoneNumber, setPhoneNumber] = useState(routeParams.phoneNumber || "")

  const [countryPickerVisible, setCountryPickerVisible] = useState(false)
  const [phoneCountryPickerVisible, setPhoneCountryPickerVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Animation values for the loading dots
  const dot1Opacity = new Animated.Value(0)
  const dot2Opacity = new Animated.Value(0)
  const dot3Opacity = new Animated.Value(0)

  // Log the route params for debugging
  useEffect(() => {
    console.log("Route params:", routeParams)
  }, [routeParams])

  const onSelectCountry = (country) => {
    setNationality(country.cca2)
    setCountryName(`${country.name} `)
    setCountryPickerVisible(false)
  }

  const onSelectPhoneCountry = (country) => {
    setPhoneCountryCode(country.cca2)
    setPhoneCallingCode(country.callingCode[0])
    setPhoneCountryPickerVisible(false)
  }

  const animateDots = () => {
    Animated.sequence([
      // Dot 1
      Animated.timing(dot1Opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      // Dot 2
      Animated.timing(dot2Opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      // Dot 3
      Animated.timing(dot3Opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      // Reset all dots
      Animated.parallel([
        Animated.timing(dot1Opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
    ]).start(() => {
      if (isLoading) {
        animateDots() // Continue animation if still loading
      }
    })
  }

  const handleContinue = () => {
    setIsLoading(true)
    animateDots()

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to next screen
      navigation.navigate("GettingVerified")
    }, 1000) // 3 second delay to simulate network request
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1E23" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Confirm Information</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Nationality */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nationality</Text>
          <TouchableOpacity style={styles.input} onPress={() => setCountryPickerVisible(true)}>
            <View style={styles.countryPickerButton}>
              <CountryPicker
                withFlag
                withEmoji={false}
                withCallingCodeButton={false}
                withCallingCode={false}
                withFilter={true}
                withAlphaFilter={true}
                countryCode={nationality}
                onSelect={onSelectCountry}
                visible={false}
              />
              <Text style={styles.inputText}>{countryName}</Text>
              <Ionicons name="chevron-down" size={20} color="#8e8e93" style={styles.dropdownIcon} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Phone Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={[styles.phoneInputContainer, !isEmailVerification && styles.verifiedField]}>
            <TouchableOpacity
              style={styles.phoneCountryPickerButton}
              onPress={() => setPhoneCountryPickerVisible(true)}
              disabled={!isEmailVerification}
            >
              <CountryPicker
                withFlag
                withEmoji={false}
                withCallingCodeButton={false}
                withCallingCode={false}
                withFilter={true}
                countryCode={phoneCountryCode}
                onSelect={() => {}}
                visible={false}
              />
              <Text style={styles.callingCode}>+{phoneCallingCode}</Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color="#8e8e93"
                style={{ opacity: !isEmailVerification ? 0.5 : 1 }}
              />
            </TouchableOpacity>

            <TextInput
              style={[styles.phoneNumberInput, !isEmailVerification && styles.readOnlyInput]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone number"
              placeholderTextColor="#8e8e93"
              keyboardType="phone-pad"
              editable={isEmailVerification} // Only editable if email verification was used
            />

            {!isEmailVerification && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
        </View>

        {/* Legal Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Legal Name</Text>
          <TextInput
            style={styles.input}
            value={legalName}
            onChangeText={setLegalName}
            placeholder="Enter your legal name"
            placeholderTextColor="#8e8e93"
          />
        </View>

        {/* Middle Names */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Middle Names</Text>
          <TextInput
            style={styles.input}
            value={middleNames}
            onChangeText={setMiddleNames}
            placeholder="Enter your middle names"
            placeholderTextColor="#8e8e93"
          />
        </View>

        {/* Email Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={[styles.emailContainer, isEmailVerification && styles.verifiedField]}>
            <TextInput
              style={[
                styles.input,
                isEmailVerification && styles.readOnlyInput,
                { flex: 1, paddingRight: isEmailVerification ? 80 : 15 },
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor="#8e8e93"
              keyboardType="email-address"
              editable={!isEmailVerification} // Only editable if phone verification was used
            />

            {isEmailVerification && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
        </View>

        {/* Date of Birth */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date of Birth (Year/Month/Day)</Text>
          <View style={styles.dateContainer}>
            <TextInput
              style={styles.dateInput}
              value={yearOfBirth}
              onChangeText={setYearOfBirth}
              placeholder="YYYY"
              placeholderTextColor="#8e8e93"
              keyboardType="number-pad"
              maxLength={4}
            />
            <TextInput
              style={styles.dateInput}
              value={monthOfBirth}
              onChangeText={setMonthOfBirth}
              placeholder="MM"
              placeholderTextColor="#8e8e93"
              keyboardType="number-pad"
              maxLength={2}
            />
            <TextInput
              style={styles.dateInput}
              value={dayOfBirth}
              onChangeText={setDayOfBirth}
              placeholder="DD"
              placeholderTextColor="#8e8e93"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
        </View>

        {/* Residential Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Residential Address</Text>
          <TextInput
            style={styles.input}
            value={residentialAddress}
            onChangeText={setResidentialAddress}
            placeholder="Enter your residential address"
            placeholderTextColor="#8e8e93"
            autoCapitalize="characters"
          />
        </View>

        {/* City */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
            placeholderTextColor="#8e8e93"
            autoCapitalize="characters"
          />
        </View>

        {/* Postal Code */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Postal Code</Text>
          <TextInput
            style={styles.input}
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Enter your postal code"
            placeholderTextColor="#8e8e93"
            keyboardType="number-pad"
          />
        </View>
      </ScrollView>

      {/* Agreement Text */}
      <Text style={styles.agreementText}>
        By continuing, you agree that the above captured personal data is accurate.
      </Text>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue} disabled={isLoading} activeOpacity={0.8}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.continueButtonText}>Loading</Text>
            <View style={styles.dotsContainer}>
              <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
              <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
              <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
            </View>
          </View>
        ) : (
          <Text style={styles.continueButtonText}>Continue</Text>
        )}
      </TouchableOpacity>

      {/* Country Picker Modal for Nationality */}
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

      {/* Country Picker Modal for Phone */}
      <CountryPicker
        withFilter
        withFlag
        withCallingCode
        withCallingCodeButton={false}
        withAlphaFilter
        withEmoji
        onSelect={onSelectPhoneCountry}
        visible={phoneCountryPickerVisible}
        onClose={() => setPhoneCountryPickerVisible(false)}
        containerButtonStyle={{ display: "none" }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#8e8e93",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
  },
  readOnlyInput: {
    color: "#fff",
    opacity: 0.8,
    backgroundColor: "#232630",
  },
  inputText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  countryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  phoneInputContainer: {
    flexDirection: "row",
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    height: 50,
    overflow: "hidden",
  },
  emailContainer: {
    position: "relative",
  },
  verifiedField: {
    borderWidth: 1,
    borderColor: "#F0B90B",
    borderRadius: 8,
  },
  verifiedBadge: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  verifiedText: {
    color: "#4CAF50",
    fontSize: 12,
    marginLeft: 4,
  },
  phoneCountryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderRightColor: "#3A3D45",
    backgroundColor: "#2A2D35",
  },
  callingCode: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  phoneNumberInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 15,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    backgroundColor: "#2A2D35",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    textAlign: "center",
  },
  agreementText: {
    color: "#8e8e93",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: "#F0B90B",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginHorizontal: 30,
  },
  continueButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
    marginHorizontal: 2,
  },
})

export default ConfirmInformationScreen