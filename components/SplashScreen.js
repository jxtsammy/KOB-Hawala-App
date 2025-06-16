'use client';
import { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Animation values for the dots
  const dot1Height = useRef(new Animated.Value(5)).current;
  const dot2Height = useRef(new Animated.Value(5)).current;
  const dot3Height = useRef(new Animated.Value(5)).current;

  useEffect(() => {
    // Start the animation sequence
    animateDots();

    // Navigate to the next screen after 5 seconds
    const timer = setTimeout(() => {
      // Navigate to the login screen or main app screen
      if (navigation) {
        navigation.replace('Onboarding'); // Replace with your initial screen name
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const animateDots = () => {
    // Reset dot heights
    dot1Height.setValue(5);
    dot2Height.setValue(5);
    dot3Height.setValue(5);

    // Sequence of animations
    Animated.sequence([
      // Dot 1 animation
      Animated.timing(dot1Height, {
        toValue: 30,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(dot1Height, {
        toValue: 5,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.in(Easing.ease),
      }),

      // Dot 2 animation
      Animated.timing(dot2Height, {
        toValue: 30,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(dot2Height, {
        toValue: 5,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.in(Easing.ease),
      }),

      // Dot 3 animation
      Animated.timing(dot3Height, {
        toValue: 30,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(dot3Height, {
        toValue: 5,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.in(Easing.ease),
      }),
    ]).start((finished) => {
      if (finished) {
        // Restart the animation
        animateDots();
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1E23" />

      {/* App Logo */}
      <Image
        source={require('../assets/WhatsApp_Image_2025-05-17_at_18.17.36_6d6f6315-removebg-preview.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Animated Dots */}
      <View style={styles.dotsContainer}>
        <Animated.View
          style={[
            styles.dot,
            {
              height: dot1Height,
              marginTop: Animated.subtract(10, Animated.divide(dot1Height, 4)),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              height: dot2Height,
              marginTop: Animated.subtract(10, Animated.divide(dot2Height, 2)),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              height: dot3Height,
              marginTop: Animated.subtract(10, Animated.divide(dot3Height, 2)),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 800,
    bottom: 30,
    left: 10
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50, // Give enough height for the dots to expand
  },
  dot: {
    width: 13,
    backgroundColor: '#F0B90B',
    borderRadius: 4,
    marginHorizontal: 8,
  },
});

export default SplashScreen;
