"use client"
import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Animated, Easing } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const UnderReviewScreen = ({ navigation, estimatedMinutes = 15 }) => {
  const [remainingTime, setRemainingTime] = useState(estimatedMinutes)

  // Animation values
  const topSquareRotation = useRef(new Animated.Value(0)).current
  const hourglassScale = useRef(new Animated.Value(1)).current

  // Start the hourglass animation
  useEffect(() => {
    const animateHourglass = () => {
      // Reset animation values
      topSquareRotation.setValue(0)
      hourglassScale.setValue(1)

      Animated.sequence([
        // Scale up the entire hourglass
        Animated.timing(hourglassScale, {
          toValue: 1.3,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),

        // Rotate the square
        Animated.timing(topSquareRotation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),

        // Scale back down
        Animated.timing(hourglassScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),

        // Pause
        Animated.delay(500),
      ]).start(() => {
        // Continue animation loop
        animateHourglass()
      })
    }

    animateHourglass()

    // Countdown timer
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 60000) // Update every minute

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Map rotation values to degrees (0 to 180)
  const topSpin = topSquareRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  const handleClose = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleContinue = () => {
      navigation.navigate("NavigationBar")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />

      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        {/* Hourglass Icon - Simplified to a single square with diamond */}
        <Animated.View
          style={[
            styles.hourglassContainer,
            {
              transform: [{ scale: hourglassScale }],
            },
          ]}
        >
          {/* Single Square with Diamond */}
          <Animated.View
            style={[
              styles.singleSquare,
              {
                transform: [{ rotate: topSpin }],
              },
            ]}
          >
            <View style={styles.diamondInSquare} />
          </Animated.View>
        </Animated.View>

        {/* Title */}
        <Text style={styles.title}>Under Review</Text>

        {/* Description */}
        <Text style={styles.description}>
          You will receive an email/app notification once the review is completed. Meanwhile, please feel free to
          explore our website/app.
        </Text>

        {/* Estimated Time */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Estimated time</Text>
          <Text style={styles.timeValue}>{remainingTime} Minute(s)</Text>
        </View>
      </View>

      {/* Continue Button - Now always enabled */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.8}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  hourglassContainer: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  singleSquare: {
    width: 80,
    height: 80,
    backgroundColor: "#3A3D45",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  diamondInSquare: {
    width: 40,
    height: 40,
    backgroundColor: "#F0B90B",
    transform: [{ rotate: "45deg" }],
    borderRadius: 4,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    color: "#8e8e93",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  timeContainer: {
    alignItems: "center",
  },
  timeLabel: {
    color: "#8e8e93",
    fontSize: 14,
    marginBottom: 5,
  },
  timeValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#F0B90B",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default UnderReviewScreen