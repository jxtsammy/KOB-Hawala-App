import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../Home/Home';
import Trade from '../TradeTab/Trade';
import AssetsScreen from '../AssetsTab/Assets';
import Market from '../Home/Market';
import Notification from '../Home/Notifications'

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
 return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111',
          borderTopColor: '#111',
          height: 75,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Markets') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Trade') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Assets') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Markets" component={Market} />
      <Tab.Screen name="Trade" component={Trade} />
      <Tab.Screen name="Notifications" component={Notification} />
      <Tab.Screen name="Assets" component={AssetsScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;