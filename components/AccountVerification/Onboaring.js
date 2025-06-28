"use client"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

const WelcomeScreen = ({ navigation, backgroundImage = require("../../assets/crypto.jpg") }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)", "rgba(0,0,0,1)"]} style={styles.gradient}>
          <View style={styles.contentContainer}>
            <View style={styles.spacer} />

            <View style={styles.textContainer}>
              <Text style={styles.title}>Crypto Just{"\n"}Got Easier!</Text>
              <Text style={styles.subtitle}>Experience seamless trading and secure asset management</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.getStartedButtonText}>Get Started</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  spacer: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    lineHeight: 48,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 18,
    lineHeight: 26,
    maxWidth: "80%",
  },
  buttonContainer: {
    marginTop: 40,
  },
  getStartedButton: {
    backgroundColor: "#F0B90B",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  getStartedButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    alignItems: "center",
  },
  loginButtonText: {
    color: "#F0B90B",
    fontSize: 20,
    fontWeight: 'bold'
  },
})

export default WelcomeScreen