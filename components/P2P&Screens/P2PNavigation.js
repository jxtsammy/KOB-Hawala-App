"use client"
import { useRef } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Dimensions } from "react-native"
import { Users, FileText,  MessageCircle, User, Home } from "lucide-react-native"
import { StatusBar } from 'react-native';
import P2PScreen from './P2PTrade'
import OrdersScreen from './Orders'
import ChatScreen from './ChatScreens/Chatlist'
import ProfileScreen from './Profile&Screens/ProfileScreen'

const Tab = createBottomTabNavigator()

// Get screen dimensions
const { width, height } = Dimensions.get("window")

// Floating Home Button Component
const FloatingHomeButton = () => {
  const navigation = useNavigation()
  const pan = useRef(new Animated.ValueXY({ x: width - 70, y: 100 })).current

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        })
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset()

        // Keep button within screen bounds
        const newX = Math.max(20, Math.min(width - 70, pan.x._value))
        const newY = Math.max(80, Math.min(height - 200, pan.y._value))

        Animated.spring(pan, {
          toValue: { x: newX, y: newY },
          useNativeDriver: false,
        }).start()
      },
    }),
  ).current

  return (
    <Animated.View
      style={[
        styles.floatingButtonContainer,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('NavigationBar')}>
        <Home size={28} color="#000" />
      </TouchableOpacity>
    </Animated.View>
  )
}

// Bottom Tab Navigator with Floating Button
const BottomTabNavigator = () => {
  return (
    <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#111" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent

            switch (route.name) {
              case "P2P":
                IconComponent = Users
                break
              case "Orders":
                IconComponent = FileText
                break
              case "Chat":
                IconComponent = MessageCircle
                break
              case "Profile":
                IconComponent = User
                break
              default:
                IconComponent = Users
            }

            return <IconComponent size={size} color={color} />
          },
          tabBarActiveTintColor: "#F0B90B",
          tabBarInactiveTintColor: "#8e8e93",
          tabBarStyle: {
            backgroundColor: "#111",
            borderTopColor: "#111",
            borderTopWidth: 1,
            height: 90,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            marginTop: 5
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="P2P" component={P2PScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarBadge: 1,
            tabBarBadgeStyle: {
              backgroundColor: "#F0B90B",
              color: "#000",
              fontSize: 15,
              fontWeight: "bold",
            },
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      {/* Floating Home Button */}
      <FloatingHomeButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  floatingButtonContainer: {
    position: "absolute",
    zIndex: 999,
  },
  homeButton: {
    width: 60,
    height: 60,
    borderRadius: 25,
    backgroundColor: "#F0B90B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
})

export default BottomTabNavigator;